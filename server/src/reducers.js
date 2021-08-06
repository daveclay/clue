const GameSelectors = require("game-selectors")
const GameState = require('./GameState')
const ArrayUtils = require("array-utils")

const reduxUtils = require("redux-utils")
const gameSelectors = require("game-selectors")
const mutators = require("./mutators")

const {
  mutatorToReducer,
  reduceAll,
  Reducers,
} = reduxUtils

// TODO: remove this, the prefix shold be removed from the game handler
const reducers = new Reducers({
  actionPrefix: "server/"
})

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

const addPlayer = (state, action) => reduceAll(state,
  mutatorToReducer(state => mutators.addPlayer(state, action))
)

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

const enableComputerPlayers = state => ({
  ...state,
  computerPlayersEnabled: true,
})


// TODO: integrate this someplace.
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

reducers.map('startGame', state => reduceAll(state,
  state => ({
    ...state,
    gameOver: false
  }),
  resetCurrentTurnPlayerIndex,
  mutatorToReducer(pickWhoDunnit),
  mutatorToReducer(distributeCards),
  mutatorToReducer(movePlayersToStartingPositions)
))

reducers.map('resetGame', state => GameState)
reducers.map('enableComputerPlayers', enableComputerPlayers)
reducers.map('addHumanPlayer', addPlayer)
reducers.map('addComputerPlayer', addPlayer)
reducers.map('onRoomSelected', selectRoom)
reducers.map('nextPlayerTurn', nextPlayerTurn)


module.exports = reducers

