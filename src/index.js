import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import App from './components/App'

import {
  addComputerPlayer,
  addHumanPlayer,
  enableComputerPlayers,
  onRoomSelected,
  startGame,
  updatePlayerName,
} from "./redux/actions";

const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
)

const steps = [
  () => updatePlayerName("Jackson"),
  () => addHumanPlayer(),
  () => updatePlayerName("Daddy"),
  () => addHumanPlayer(),
  () => addComputerPlayer(),
  () => addComputerPlayer(),
  () => startGame(),
  () => onRoomSelected("Kitchen"), // Daddy
  () => onRoomSelected("Library"), // Foo
  () => enableComputerPlayers()
]
let currentStepIndex = 0;
let runStep = () => {
  console.log(steps[currentStepIndex])
  store.dispatch(steps[currentStepIndex]());
  currentStepIndex++;
  if (currentStepIndex === steps.length) {
    clearInterval(intervalId);
  }
}

let intervalId = setInterval(() => runStep(), 100)



