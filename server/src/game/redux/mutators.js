const { ArrayUtils, IteratorUtils } = require("js-utils")
const gameSelectors = require("game-selectors")

const {
  sample,
  pluckRandom,
  allExcept
} = ArrayUtils
const {
  times
} = IteratorUtils

const {
  getAvailableCharacters,
  getCurrentTurnPlayer,
  getRoomByName,
} = gameSelectors

/************************************************
 * Mutators
 ************************************************/
// TODO: const-ify I guess, probably more Javascript-like than static methods, since this is never instantiated.
class Mutators {
  static resetGame(state) {
    state.gameStarted = false
  }

  static addPlayer(state, action) {
    let availableCharacters = getAvailableCharacters(state.characters, state.players)
    if (availableCharacters.size === 0) {
      state.notify = "No more characters available!"
      return
    }

    let character = sample(availableCharacters)
    let playerIndex = state.players.length
    let player = {
      id: playerIndex,
      gameClientId: action.gameClientId,
      human: action.player.human,
      name: action.player.name || character.name,
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

