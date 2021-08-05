import {
  times,
  sample,
  pluckRandom,
  allExcept
} from "array-utils"
import {
  getAvailableCharacters,
  getCurrentTurnPlayer,
  getRoomByName,
} from "game-selectors"

/************************************************
 * Mutators
 ************************************************/
export const resetGame = state => {
  state.gameOver = false
  state.victory = false
}

export const addPlayer = (state, action) => {
  let availableCharacters = getAvailableCharacters(state.characters, state.players)
  if (availableCharacters.size == 0) {
    alert("No more characters available!")
    return state;
  }

  let character = sample(availableCharacters)
  let playerIndex = state.players.length
  let player = {
    ...action.player,
    id: playerIndex,
    name: state.addPlayerForm.name || character.name,
    character: character,
    image: character.image,
    cards: []
  }
  state.players[state.players.length] = player
  movePlayerToRoom(state, player, "Hall")
  state.addPlayerForm.name = ""
}

export const movePlayersToStartingPositions = state => {
  //state.rooms.forEach(room => room.playerNames = []);
}

export const distributeCards = state => {
  let availableCards = [
    ...state.characters,
    ...state.weapons,
    ...state.rooms
  ]

  let numPlayers = state.players.length

  times(availableCards.length) (index => {
    let playerIndex = index % numPlayers
    let player = state.players[playerIndex]
    let card = {
      id: index,
      ...pluckRandom(availableCards)
    }

    player.cards = [...player.cards, card]
  })
}

export const pickWhoDunnit = state => {
  state.whoDunnit = {
    character: sample(state.characters),
    weapon: sample(state.weapons),
    room: sample(state.rooms)
  }
}

export const movePlayerToRoom = (state, player, roomName) => {
  leaveCurrentRoom(state, player.name)
  let newRoom = getRoomByName(state, roomName);
  newRoom.playerNames[newRoom.playerNames.length] = player.name
}

export const moveCurrentPlayerToRoom = (state, roomName) => {
  let currentTurnPlayer = getCurrentTurnPlayer(state)
  if (currentTurnPlayer) {
    movePlayerToRoom(state, currentTurnPlayer, roomName)
  }
}

export const leaveCurrentRoom = (state, playerNameToRemove) => {
  state.rooms.forEach(room => {
    room.playerNames = allExcept(room.playerNames, playerNameToRemove);
  })
}
