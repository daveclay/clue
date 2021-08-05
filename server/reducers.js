const reduxUtils = require("redux-utils")
const gameSelectors = require("game-selectors")
const mutators = require("./mutators")

const {
  mutatorToReducer,
  reduceAll,
  reducer,
  actionPrefix,
  map
} = reduxUtils

actionPrefix("server/")

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

const updatePlayerName = (state, action) => {
  return {
    ...state,
    addPlayerForm: {
      name: action.name
    }
  }
}

const startGame = state => reduceAll(state,
  state => ({
    ...state,
    gameOver: false,
    victory: false
  }),
  resetCurrentTurnPlayerIndex,
  mutatorToReducer(pickWhoDunnit),
  mutatorToReducer(distributeCards),
  mutatorToReducer(movePlayersToStartingPositions),
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


/************************************************
 * Other Reducers, Helpers, and Shared Reducer Methods
 ************************************************/
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

map("hello", (state, action) => {
  console.log('Got hello data!', action)
  // TODO: ok, so this updates, but what does it return to the client?
  // TODO: ok, so it modifies some part of the state tree.
  // then, the "framework" determines _what_ changed, and sends it back?
  //
})
map('startGame', startGame)
map('enableComputerPlayers', enableComputerPlayers)
map('updatePlayerName', updatePlayerName)
map('addHumanPlayer', addPlayer)
map('addComputerPlayer', addPlayer)
map('onRoomSelected', selectRoom)
map('nextPlayerTurn', nextPlayerTurn)
