import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer, initialState } from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
import io from 'socket.io-client';

import { init } from "./actions"

const socket = io(process.env.REACT_APP_SERVER_URL|| 'http://localhost:4001');

const isServerAction = action => {
  return action && action.type && action.type.indexOf("server/") === 0
}

const socketIoMiddleware = store => {
  socket.on('action', store.dispatch)
  return next => action => {
    console.log('Hi, I am socketMiddleware with action', action)
    if (isServerAction(action)) {
      console.log("OK then, gonna emit!")
      socket.emit('action', action)
    }
    return next(action)
  }
}

const middlewareEnhancer = applyMiddleware(thunkMiddleware, socketIoMiddleware)
const store = createStore(rootReducer, initialState, composeWithDevTools(middlewareEnhancer))

store.dispatch(init());

export default store
