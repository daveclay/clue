/************************************************
 * Selectors
 ************************************************/
class Selectors {
  static getPlayerCharacterNames(players) {
    return players.map(player => player.character.name)
  }

  static getCurrentTurnPlayer(state) {
    return state.players[state.currentTurnPlayerIndex]
  }

  static getCurrentTurnPlayerName(state) {
    let currentTurnPlayer = Selectors.getCurrentTurnPlayer(state)
    if (currentTurnPlayer) {
      return currentTurnPlayer.name
    } else {
      return null;
    }
  }

  static isPlayerInRoom(room, player) {
    return room.playerIds.includes(player.id)
  }

  static getRoomForPlayer(state, player) {
    return state.rooms.find(room => Selectors.isPlayerInRoom(room, player))
  }

  static isCurrentTurnPlayerInRoom(state, room) {
    let currentTurnPlayer = Selectors.getCurrentTurnPlayer(state)
    if (currentTurnPlayer) {
      let currentTurnPlayerRoom = Selectors.getRoomForPlayer(state, currentTurnPlayer)
      return currentTurnPlayerRoom && currentTurnPlayerRoom.name === room.name
    } else {
      return false
    }
  }

  static getPlayerById(players, id) {
    return players.find(player => player.id === id)
  }

  static getAvailableCharacters(characters, players) {
    let playerCharacterNames = Selectors.getPlayerCharacterNames(players)
    return characters.filter(character => !playerCharacterNames.includes(character.name))
  }

  static getPlayersInRoom(players, room) {
    return room.playerIds.map(id => Selectors.getPlayerById(players, id))
  }
  static isCurrentTurnPlayer(state, player) {
    return Selectors.getCurrentTurnPlayerName(state) === player.name
  }

  static isCurrentTurnPlayerAbleToSelectRoom(state, room) {
    let currentTurnPlayer = Selectors.getCurrentTurnPlayer(state)
    return currentTurnPlayer &&
      !Selectors.isCurrentTurnPlayerInRoom(state, room) &&
      !state.gameOver &&
      currentTurnPlayer.human
  }

  static getRoomByName(state, roomName) {
    return state.rooms.find(room => room.name === roomName)
  }

  static getNextPlayerTurnIndex(state)  {
    let nextIndex = state.currentTurnPlayerIndex + 1
    if (state.players.length === nextIndex) {
      return 0;
    } else {
      return nextIndex;
    }
  }
}

module.exports = Selectors