/************************************************
 * Selectors
 ************************************************/
const getPlayerCharacterNames = (players) => players.map(player => player.character.name)
const getCurrentTurnPlayer = (state) => state.players[state.currentTurnPlayerIndex]
const getCurrentTurnPlayerName = (state) => {
  let currentTurnPlayer = getCurrentTurnPlayer(state)
  if (currentTurnPlayer) {
    return currentTurnPlayer.name
  } else {
    return null;
  }
}
const isPlayerInRoom = (room, player) => room.playerNames.includes(player.name)
const getRoomForPlayer = (state, player) => {
  return state.rooms.find(room => isPlayerInRoom(room, player))
}
const isCurrentTurnPlayerInRoom = (state, room) => {
  let currentTurnPlayer = getCurrentTurnPlayer(state)
  if (currentTurnPlayer) {
    let currentTurnPlayerRoom = getRoomForPlayer(state, currentTurnPlayer)
    return currentTurnPlayerRoom && currentTurnPlayerRoom.name === room.name
  } else {
    return false
  }
}

const getPlayerByName = (players, name) => players.find(player => player.name === name)

module.exports = {
  getPlayerCharacterNames: getPlayerCharacterNames,
  getAvailableCharacters: (characters, players) => {
    let playerCharacterNames = getPlayerCharacterNames(players)
    return characters.filter(character => !playerCharacterNames.includes(character.name))
  },
  getPlayerByName: getPlayerByName,
  getPlayersInRoom: (players, room) => room.playerNames.map(name => getPlayerByName(players, name)),
  getCurrentTurnPlayer: getCurrentTurnPlayer,
  getCurrentTurnPlayerName: getCurrentTurnPlayerName,
  isCurrentTurnPlayer: (state, player) => getCurrentTurnPlayerName(state) === player.name,
  isCurrentTurnPlayerInRoom: isCurrentTurnPlayerInRoom,
  isCurrentTurnPlayerAbleToSelectRoom: (state, room) => {
    let currentTurnPlayer = getCurrentTurnPlayer(state);
    return currentTurnPlayer &&
      !isCurrentTurnPlayerInRoom(state, room) &&
      !state.gameOver &&
      !state.emergencyMeetingStarted &&
      currentTurnPlayer.human
  },
  isEmergencyButtonEnabled: state => {
    let currentTurnPlayer = getCurrentTurnPlayer(state);
    if (currentTurnPlayer) {
      let room = getRoomForPlayer(state, currentTurnPlayer)
      return currentTurnPlayer &&
        currentTurnPlayer.human &&
        !state.gameOver &&
        room.emergencyButton
    } else {
      return false
    }
  },
  getRoomByName: (state, roomName) => state.rooms.find(room => room.name === roomName),
  getNextPlayerTurnIndex: (state) => {
    let nextIndex = state.currentTurnPlayerIndex + 1
    if (state.players.length === nextIndex) {
      return 0;
    } else {
      return nextIndex;
    }
  }
}