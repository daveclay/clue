import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import App from './components/App'

import {
  addComputerPlayer,
  enableComputerPlayers,
  helloServer,
  onRoomSelected,
  startGame,
  resetGame,
} from "game-client-action-creators";

import {
  addHumanPlayer,
  updatePlayerName,
} from "./redux/actionCreators";

const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
)

const steps = [
  () => resetGame(),
  () => helloServer(),
  () => updatePlayerName("Jackson"),
  () => addHumanPlayer(),
  () => updatePlayerName("Daddy"),
  () => addHumanPlayer(),
  () => addComputerPlayer(),
  () => addComputerPlayer(),
  () => startGame(),
  /*
  () => enableComputerPlayers(),
  () => onRoomSelected("Kitchen"), // Jackson
  () => onRoomSelected("Library"), // Daddy
   */
]

let intervalId;
let currentStepIndex = 0;
let runStep = () => {
  console.log(steps[currentStepIndex])
  store.dispatch(steps[currentStepIndex]());
  currentStepIndex++;
  if (currentStepIndex === steps.length) {
    clearInterval(intervalId);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('run');

if (myParam) {
  intervalId = setInterval(() => runStep(), 100)
}



