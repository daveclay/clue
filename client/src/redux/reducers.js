import { map, reducer } from "redux-utils";

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
const init = state => state

const hello = (state, action) => ({
  ...state,
  messageFromServer: action.message
})

map('init', init)
map('hello', hello)
map('updatePlayerName', updatePlayerName)

export const rootReducer = reducer
