import {mutatorToReducer, reduceAll} from "../redux-utils/utils.js";
import {getCurrentTurnPlayerName, getNextPlayerTurnIndex} from "../redux-utils/selectors/selectors";

const addPlayer = (state, action) => reduceAll(state,
  mutatorToReducer(state => addPlayerMutator(state, action))
)


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

map('startGame', startGame)
map('enableComputerPlayers', enableComputerPlayers)
map('updatePlayerName', updatePlayerName)
map('addHumanPlayer', addPlayer)
map('addComputerPlayer', addPlayer)
map('onRoomSelected', selectRoom)
map('nextPlayerTurn', nextPlayerTurn)
