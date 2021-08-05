const reduxUtils = require("redux-utils")
const {
  map,
  reducer
} = reduxUtils

class GameDAO {
  actionHandlersByType = {}
  state = {
    gameOver: false,
    computerPlayersEnabled: false,
    currentTurnPlayerIndex: -1,
    computerPlayers: [],
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

  constructor(redis) {
    this.redis = redis
  }

  initialize() {
    map("server/hello", action => {
      console.log('Got hello data!', action.data)
      // TODO: ok, so this updates, but what does it return to the client?
      // TODO: ok, so it modifies some part of the state tree.
      // then, the "framework" determines _what_ changed, and sends it back?
      //
    })

    map("server/addHumanPlayer", action => {
    })
  }

  dispatch(action) {
    console.log(`action.type is ${action.type}`)
    reducer(this.state, action)
  }

  hi() {
    console.log(`hello from GameDAO: ${this.redis}`)
  }
}

module.exports = GameDAO
