const GameActionUtils = {}

GameActionUtils.isPlayerTurn = (gameClient, getState) => {
  // TODO:
  return true
}

GameActionUtils.doIfPlayerTurn = actionFn => {
  return (clientAction, dispatch, getState, gameClient) => {
    if (GameActionUtils.isPlayerTurn(gameClient, getState)) {
      actionFn(clientAction, dispatch, getState, gameClient)
    }
  }
}

module.exports = GameActionUtils

