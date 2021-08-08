import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer, initialState } from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
import io from 'socket.io-client';
import { buildSocketIOMiddleware } from "./socketIoMiddleware"
import GameClientActions from "game-client-actions"

import { init } from "./actions"

const socket = io(process.env.REACT_APP_SERVER_URL|| 'http://localhost:4001');

const isServerAction = action => {
  return action && action.type && GameClientActions[action.type] != null
}

const socketIoMiddleware = buildSocketIOMiddleware(socket, isServerAction)
const middlewareEnhancer = applyMiddleware(thunkMiddleware, socketIoMiddleware)
const store = createStore(rootReducer, initialState, composeWithDevTools(middlewareEnhancer))

store.dispatch(init());

export default store
