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

  addActionHandler(type, f) {
    this.actionHandlersByType[type] = f
  }

  map(type) {
    return {
      to: f => {
        console.log(`adding ${f} for type ${type}`)
        this.addActionHandler(type, f)
      }
    }
  }

  initialize() {
    this.map("server/hello").to(action => {
      console.log('Got hello data!', action.data)
    })
  }

  dispatch(action) {
    console.log(`action.type is ${action.type}`)
    const handler = this.actionHandlersByType[action.type]
    handler(action)
  }

  hi() {
    console.log(`hello from GameDAO: ${this.redis}`)
  }
}

module.exports = GameDAO
