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
    state.gameStarted = false
  }

  static addPlayer(state, action) {
    let availableCharacters = getAvailableCharacters(state.characters, state.players)
    if (availableCharacters.size == 0) {
      // TODO: dork this is the server. Gotta set the error notify message to the state and send it back.
      alert("No more characters available!")
      return state;
    }

    let character = sample(availableCharacters)
    let playerIndex = state.players.length
    let player = {
      human: action.player.human,
      name: action.player.name || character.name,
      id: playerIndex,
      character: character,
      image: character.image
    }

    state.players[playerIndex] = player
    Mutators.movePlayerToStartingPosition(state, player)
  }

  static movePlayersToStartingPositions(state) {
    state.rooms.forEach(room => room.playerIds = []);
    state.players.forEach(player => Mutators.movePlayerToStartingPosition(state, player))
  }

  static movePlayerToStartingPosition(state, player) {
    Mutators.movePlayerToRoom(state, player, "Hall")
  }

  static distributeCards(state) {
    let availableCards = [
      ...state.characters,
      ...state.weapons,
      ...state.rooms
    ]

    let numPlayers = state.players.length

    state.players.forEach(player => state.playerCardsByPlayerId[player.id] = [])

    times(availableCards.length)(index => {
      let playerIndex = index % numPlayers
      let player = state.players[playerIndex]
      let card = {
        id: index,
        ...pluckRandom(availableCards)
      }

      let cards = state.playerCardsByPlayerId[player.id]
      state.playerCardsByPlayerId[player.id] = [...cards, card]
    })
  }

  static pickWhoDunnit(state) {
    state.whoDunnit = {
      character: sample(state.characters),
      weapon: sample(state.weapons),
      room: sample(state.rooms)
    }
  }

  static leaveCurrentRoom(state, playerToRemove) {
    state.rooms.forEach(room => {
      room.playerIds = allExcept(room.playerIds, playerToRemove.id);
    })
  }

  static movePlayerToRoom(state, player, roomName) {
    Mutators.leaveCurrentRoom(state, player)
    let newRoom = getRoomByName(state, roomName);
    newRoom.playerIds[newRoom.playerIds.length] = player.id
  }

  static moveCurrentPlayerToRoom(state, roomName) {
    let currentTurnPlayer = getCurrentTurnPlayer(state)
    if (currentTurnPlayer) {
      Mutators.movePlayerToRoom(state, currentTurnPlayer, roomName)
    }
  }
}

module.exports = Mutators

