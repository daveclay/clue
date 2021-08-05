const redux = require("redux")
const reduxUtils = require("redux-utils")
const reducers = require("./reducers")
const GameClient = require("./GameClient")

const {
  reducer,
} = reduxUtils

const {
  createStore
} = redux


class GameClientHandler {
  initialState = {
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

  gameClients = []

  constructor(redis) {
    this.redis = redis
    this.store = createStore(reducer, this.initialState)
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
    this.store.dispatch(action)
    console.log("updated state: ", this.store.getState())
    // TODO: emit! What to emit? scope stuff? schema? Better state layout?
    this.gameClients.forEach(gameClient =>
      gameClient.update(gameClient.selectState(this.store.getState()))
    )
    // TODO: some sort of "atomic" deconstruction of the updatedState and store in redis
  }

  hi() {
    console.log(`hello from GameDAO: ${this.redis}`)
  }
}

module.exports = GameClientHandler
