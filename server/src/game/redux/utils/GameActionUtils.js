const {
  getCurrentTurnPlayer
} = require("game-selectors")

const GameActionUtils = {}

GameActionUtils.isPlayerTurn = (gameClient, getState) => {
  const state = getState()
  const player = getCurrentTurnPlayer(state)
  return gameClient.getId() === player.gameClientId
}

GameActionUtils.doIfPlayerTurn = actionFn => {
  return (clientAction, dispatch, getState, gameClient) => {
    if (GameActionUtils.isPlayerTurn(gameClient, getState)) {
      actionFn(clientAction, dispatch, getState, gameClient)
    }
  }
}

module.exports = GameActionUtils

