import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer, initialState } from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import { init } from "./actions"

const socket = io(process.env.REACT_APP_SERVER_URL|| 'http://localhost:4001');
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const middlewareEnhancer = applyMiddleware(thunkMiddleware, socketIoMiddleware)
const store = createStore(rootReducer, initialState, composeWithDevTools(middlewareEnhancer))

store.dispatch(init());

export default store
