const immer = require('immer')

const { produce } = immer

const addType = (type, item) => ({
  ...item,
  type: type
})

const addTypeToItems = (type, items) => items.map(item => addType(type, item))

const baseGameState = {
  gameOver: false,
  computerPlayersEnabled: false,
  currentTurnPlayerIndex: -1,
  computerPlayers: [],
  players: [],
  playerCardsByPlayerId: {},
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
    },
    {
      name: "Ballroom",
    },
    {
      name: "Conservatory",
    },
    {
      name: "Billiard Room",
    },
    {
      name: "Library",
    },
    {
      name: "Study",
    },
    {
      name: "Hall",
    },
    {
      name: "Lounge",
    },
    {
      name: "Dining Room",
    },
  ]
}

module.exports = produce(baseGameState, state => {
  state.characters = addTypeToItems("character", state.characters)
  state.weapons = addTypeToItems("weapon", state.weapons)
  state.rooms = addTypeToItems("room", state.rooms).map(room => {
    room.playerIds = []
    return room
  })

})
