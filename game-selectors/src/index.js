/************************************************
 * Selectors
 ************************************************/
const Selectors = {}

Selectors.getPlayerCharacterNames = (players) => {
  return players.map(player => player.character.name)
}

Selectors.getCurrentTurnPlayer = (state) => {
  return state.players[state.currentTurnPlayerIndex]
}

Selectors.getCurrentTurnPlayerName = (state) => {
  let currentTurnPlayer = Selectors.getCurrentTurnPlayer(state)
  if (currentTurnPlayer) {
    return currentTurnPlayer.name
  } else {
    return null;
  }
}

Selectors.isPlayerInRoom = (room, player) => {
  return room.playerIds.includes(player.id)
}

Selectors.getRoomForPlayer = (state, player) => {
  return state.rooms.find(room => Selectors.isPlayerInRoom(room, player))
}

Selectors.isCurrentTurnPlayerInRoom = (state, room) => {
  let currentTurnPlayer = Selectors.getCurrentTurnPlayer(state)
  if (currentTurnPlayer) {
    let currentTurnPlayerRoom = Selectors.getRoomForPlayer(state, currentTurnPlayer)
    return currentTurnPlayerRoom && currentTurnPlayerRoom.name === room.name
  } else {
    return false
  }
}

Selectors.getPlayerById = (players, id) => {
  return players.find(player => player.id === id)
}

Selectors.getAvailableCharacters = (characters, players) => {
  let playerCharacterNames = Selectors.getPlayerCharacterNames(players)
  return characters.filter(character => !playerCharacterNames.includes(character.name))
}

Selectors.getPlayersInRoom = (players, room) => {
  return room.playerIds.map(id => Selectors.getPlayerById(players, id))
}
Selectors.isCurrentTurnPlayer = (state, player) => {
  return Selectors.getCurrentTurnPlayerName(state) === player.name
}

Selectors.isCurrentTurnPlayerAbleToSelectRoom = (state, room) => {
  let currentTurnPlayer = Selectors.getCurrentTurnPlayer(state)
  return currentTurnPlayer &&
    !Selectors.isCurrentTurnPlayerInRoom(state, room) &&
    !state.gameOver &&
    currentTurnPlayer.human
}

Selectors.getRoomByName = (state, roomName) => {
  return state.rooms.find(room => room.name === roomName)
}

Selectors.getNextPlayerTurnIndex = (state) => {
  let nextIndex = state.currentTurnPlayerIndex + 1
  if (state.players.length === nextIndex) {
    return 0
  } else {
    return nextIndex
  }
}

module.exports = {
  default: Selectors
}