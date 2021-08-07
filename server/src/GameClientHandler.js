const redux = require("redux")
const reducers = require("./reducers")
const GameClient = require("./GameClient")
const GameState = require("./GameState")
const ServerActionCreators = require("./actions")
const GameClientActionCreators = require("game-client-action-creators")

const {
  createStore
} = redux

const validateGameClientAction = clientAction => GameClientActionCreators[clientAction.type] != null

const dispatchGameClientAction = (clientAction, dispatch, getState) => {
  if (validateGameClientAction(clientAction)) {
    if (ServerActionCreators[clientAction.type]) {
      const serverActionCreator = ServerActionCreators[clientAction.type]
      if (typeof serverActionCreator === 'function') {
        serverActionCreator(clientAction, dispatch, getState)
      } else {
        dispatch(serverActionCreator(clientAction))
      }
    } else {
      dispatch(clientAction)
    }
    return true
  } else {
    console.warn(`action ${clientAction.type} is not in ${GameClientActionCreators} - ignoring`)
    return false
  }
}

class GameClientHandler {
  initialState = GameState
  gameClients = []

  constructor(redis) {
    this.redis = redis
    this.store = createStore(reducers.getReduxReducerFunction(), this.initialState)
    this.clientActionInterceptors = {}
  }

  addSocketClient(socket) {
    const gameClient = new GameClient(socket);
    this.gameClients.push(gameClient)
    socket.on('action', action => {
      this.dispatchGameClientAction(gameClient, action)
    })
  }

  dispatchGameClientAction(gameClient, action) {
    // TODO: Probably add the gameClient to a clone of the action to dispatch? So that one client can't pretend its their turn?
    console.log(`action is`, action)

    let getState = () => this.store.getState()
    let dispatch = action => {
      this.store.dispatch(action)
    }

    if (dispatchGameClientAction(action, dispatch, getState)) {
      // TODO: store game state as a log?
      console.log("updated state: ", this.store.getState())

      // TODO: some sort of "atomic" deconstruction of the updatedState and store in redis
      // save(state)

      this.gameClients.forEach(gameClient =>
        gameClient.update(gameClient.selectState(this.store.getState()))
      )
    }
  }

  hi() {
    console.log(`hello from GameDAO: ${this.redis}`)
  }
}

module.exports = GameClientHandler
