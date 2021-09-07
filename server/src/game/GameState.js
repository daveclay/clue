const immer = require('immer')

const { produce } = immer

const compose = (...funcs) => item => {
  return funcs.reduce((item, fn) => fn(item), item)
}

const addAttribute = attribute => value => item => ({
  ...item,
  [attribute]: typeof value == "function" ? value(item) : value
})

const addTypeAttribute = addAttribute("type")
const addCharacterType = addTypeAttribute("character")
const addWeaponType = addTypeAttribute("weapon")
const addRoomType = addTypeAttribute("room")

const addIdAttribute = addAttribute("id")
const addIdToItem = addIdAttribute(item => `${item.type}_${item.name.replace(/\W/g, "_")}`)

const configureCharacter = compose(addCharacterType, addIdToItem)
const configureWeapon = compose(addWeaponType, addIdToItem)
const configureRoom = compose(addRoomType, addIdToItem, item => ({
  ...item,
  playerIds: []
}))

const baseGameState = {
  gameStarted: false,
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
  state.characters = state.characters.map(configureCharacter)
  state.weapons = state.weapons.map(configureWeapon)
  state.rooms = state.rooms.map(configureRoom)
})
