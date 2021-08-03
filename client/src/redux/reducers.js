import * as actions from "./actions"
import { map, reducer } from "./utils/redux-map";
import { mutatorToReducer, ArrayUtils, reduceAll } from "../utils";
import {
  addPlayer as addPlayerMutator, distributeCards,
  moveCurrentPlayerToRoom,
  movePlayersToStartingPositions, pickWhoDunnit,
} from "./mutators"
import {
  getCurrentTurnPlayerName,
  getNextPlayerTurnIndex
} from "../selectors/selectors"

export const initialState = {
  gameOver: false,
  notify: {
    message: null
  },
  computerPlayersEnabled: false,
  currentTurnPlayerIndex: -1,
  emergencyMeetingStarted: false,
  emergencyMeetingInitiatedByPlayerIndex: null,
  voteTalliesByPlayer: {},
  computerPlayers: [],
  addPlayerForm: {
    name: "",
  },
  players: [],
  whoDunnit: null,
  characters: [
    {
      name: "Miss Scarlett",
      image: "pink"
    },
    {
      name: "Mr. Green",
      image: "green"
    },
    {
      name: "Colonel Mustard",
      image: "orange"
    },
    {
      name: "Professor Plum",
      image: "blue"
    },
    {
      name: "Mrs. Peacock",
      image: "lightblue"
    },
    {
      name: "Mrs. White",
      image: "white"
    }
  ],
  weapons: [
    {
      name: "Candlestick"
    },
    {
      name: "Dagger"
    },
    {
      name: "Lead Pipe"
    },
    {
      name: "Revolver"
    },
    {
      name: "Rope"
    },
    {
      name: "Wrench"
    }
  ],
  rooms: [
    {
      name: "Kitchen",
      playerNames: [],
      emergencyButton: true
    },
    {
      name: "Ballroom",
      playerNames: [],
    },
    {
      name: "Conservatory",
      playerNames: [],
    },
    {
      name: "Billiard Room",
      playerNames: [],
    },
    {
      name: "Library",
      playerNames: [],
    },
    {
      name: "Study",
      playerNames: [],
    },
    {
      name: "Hall",
      playerNames: [],
    },
    {
      name: "Lounge",
      playerNames: [],
    },
    {
      name: "Dining Room",
      playerNames: [],
    },
  ]
}

const updatePlayerName = (state, action) => {
  return {
    ...state,
    addPlayerForm: {
      name: action.name
    }
  }
}

const addPlayer = (state, action) => reduceAll(state,
  mutatorToReducer(state => addPlayerMutator(state, action))
)

const init = state => state

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

const hello = (state, action) => ({
  ...state,
  messageFromServer: action.message
})

map('init', init)
map('hello', hello)
map('startGame', startGame)
map('enableComputerPlayers', enableComputerPlayers)
map('updatePlayerName', updatePlayerName)
map('addHumanPlayer', addPlayer)
map('addComputerPlayer', addPlayer)
map('onRoomSelected', selectRoom)
map('nextPlayerTurn', nextPlayerTurn)

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

export const rootReducer = reducer
