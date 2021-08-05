const arrayUtils = require("array-utils")
const gameSelectors = require("game-selectors")

const {
  times,
  sample,
  pluckRandom,
  allExcept
} = arrayUtils

const {
  getAvailableCharacters,
  getCurrentTurnPlayer,
  getRoomByName,
} = gameSelectors

/************************************************
 * Mutators
 ************************************************/
class Mutators {
  static resetGame(state) {
    state.gameOver = false
    state.victory = false
  }

  static addPlayer(state, action) {
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
    Mutators.movePlayerToRoom(state, player, "Hall")
    state.addPlayerForm.name = ""
  }

  static movePlayersToStartingPositions(state) {
    //state.rooms.forEach(room => room.playerNames = []);
  }

  static distributeCards(state) {
    let availableCards = [
      ...state.characters,
      ...state.weapons,
      ...state.rooms
    ]

    let numPlayers = state.players.length

    times(availableCards.length)(index => {
      let playerIndex = index % numPlayers
      let player = state.players[playerIndex]
      let card = {
        id: index,
        ...pluckRandom(availableCards)
      }

      player.cards = [...player.cards, card]
    })
  }

  static pickWhoDunnit(state) {
    state.whoDunnit = {
      character: sample(state.characters),
      weapon: sample(state.weapons),
      room: sample(state.rooms)
    }
  }

  static leaveCurrentRoom(state, playerNameToRemove) {
    state.rooms.forEach(room => {
      room.playerNames = allExcept(room.playerNames, playerNameToRemove);
    })
  }

  static movePlayerToRoom(state, player, roomName) {
    Mutators.leaveCurrentRoom(state, player.name)
    let newRoom = getRoomByName(state, roomName);
    newRoom.playerNames[newRoom.playerNames.length] = player.name
  }

  static moveCurrentPlayerToRoom(state, roomName) {
    let currentTurnPlayer = getCurrentTurnPlayer(state)
    if (currentTurnPlayer) {
      Mutators.movePlayerToRoom(state, currentTurnPlayer, roomName)
    }
  }
}

module.exports = Mutators

