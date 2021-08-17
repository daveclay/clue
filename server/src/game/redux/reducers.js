const GameState = require('../GameState')

const reduxUtils = require("redux-utils")
const gameSelectors = require("game-selectors")
const mutators = require("./mutators")

const {
  mutatorToReducer,
  reduceAll,
  Reducers,
} = reduxUtils

const {
  getCurrentTurnPlayerName,
  getNextPlayerTurnIndex
} = gameSelectors

const {
  pickWhoDunnit,
  distributeCards,
  movePlayersToStartingPositions,
  movePlayerToRoom,
  moveCurrentPlayerToRoom,
} = mutators

/************************************************
 * Reducers
 ************************************************/
const reducers = new Reducers()

const selectRoom = (state, action) => reduceAll(state,
  mutatorToReducer(state => moveCurrentPlayerToRoom(state, action.roomName)),
)

const nextPlayerTurn = state => reduceAll(state,
  (state) => ({
    ...state,
    currentTurnPlayerIndex: getNextPlayerTurnIndex(state)
  }),
  showCurrentPlayerNotification
)

const resetCurrentTurnPlayerIndex = state => ({
  ...state,
  currentTurnPlayerIndex: -1
})

const showCurrentPlayerNotification = state => ({
  ...state,
  notify: {
    message: `${getCurrentTurnPlayerName(state)}'s turn!`,
    className: "turn"
  }
});

reducers.map("hello", (state, action) => {
  console.log('Got hello data!', action)
  return {
    ...state,
    messageFromServer: "Hello from the server"
  }
})

reducers.map('resetGame', state => GameState)
reducers.map('onRoomSelected', selectRoom)
reducers.map('nextPlayerTurn', nextPlayerTurn)


module.exports = reducers