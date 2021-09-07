const redux = require("redux")
const reducers = require("./redux/reducers")
const GameClient = require("./GameClient")
const GameState = require("./GameState")
const gameClientDispatcher = require("./gameClientDispatcher")
const {applyMiddleware} = require("redux");

const {
  createStore
} = redux

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  console.group(`Server Action ${action.type}`)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

class GameClientHandler {
  initialState = GameState
  gameClients = []

  constructor(redis) {
    this.redis = redis
    this.store = createStore(
      reducers.getReduxReducerFunction(),
      this.initialState,
      applyMiddleware(logger))

    this.store.subscribe(() => {
      this.updateClients()
    })
    this.clientActionInterceptors = {}
  }

  addSocketClient(socket) {
    const gameClient = new GameClient(socket);
    this.gameClients.push(gameClient)
    // TODO: when the server restarts, this isn't enough, since the game was reset.
    this.updateClients()
    socket.on('action', action => {
      this.dispatchGameClientAction(gameClient, action)
    })
  }

  updateClients() {
    this.gameClients.forEach(gameClient =>
      gameClient.update(gameClient.selectState(this.store.getState()))
    )
  }

  dispatchGameClientAction(gameClient, action) {
    // TODO: Probably add the gameClient to a clone of the action to dispatch? So that one client can't pretend its their turn?
    console.group(`Client Action ${action.type}`)
    console.info("dispatching", action)

    let getState = () => this.store.getState()
    let dispatch = action => {
      this.store.dispatch(action)
    }

    if (gameClientDispatcher(action, dispatch, getState, gameClient)) {
      // TODO: store game state as a log?
      // TODO: reprt the game state to an "admin" page which then can use redux to track changes.
      // console.log("updated state: ", this.store.getState())

      // TODO: some sort of "atomic" deconstruction of the updatedState and store in redis
      // save(state)
    }
    console.groupEnd()
  }

  hi() {
    console.log(`hello from GameDAO: ${this.redis}`)
  }
}

module.exports = GameClientHandler
