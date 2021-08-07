const redux = require("redux")
const reducers = require("./reducers")
const GameClient = require("./GameClient")
const GameState = require("./GameState")
const gameClientDispatcher = require("./gameClientDispatcher")

const {
  createStore
} = redux

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

    if (gameClientDispatcher(action, dispatch, getState)) {
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
