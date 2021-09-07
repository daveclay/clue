const GameSelectors = require("game-selectors")

const Selectors = {}

Selectors.currentTurnPlayer = state => {
  if (state.players.length < 1) {
    return false;
  }

  return state.players[state.currentTurnPlayerIndex]
}

Selectors.isCurrentPlayerTurn = (state, id) => {
  const currentTurnPlayer = Selectors.currentTurnPlayer(state)
  return currentTurnPlayer && currentTurnPlayer.id === id
}

Selectors.getPlayerForGameClientId = (state, id) => {
  return state.players && state.players.find(player => player.gameClientId === id)
}

Selectors.getPlayerIndexForGameClientId = (state, id) => {
  const player = Selectors.getPlayerForGameClientId(state, id)
  return player && state.players.indexOf(player)
}

Selectors.allCards = state => {
  return [
    ...state.characters,
    ...state.weapons,
    ...state.rooms
  ]
}

Selectors.playerCards = (state, id) => {
  const player = Selectors.getPlayerForGameClientId(state, id)
  return player && state.playerCardsByPlayerId[player.id]
}


module.exports = Selectors
