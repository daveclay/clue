const GameActionUtils = {}

GameActionUtils.isPlayerTurn = (gameClient, getState) => {
  // TODO:
  return true
}

GameActionUtils.ifPlayerTurn = originalActionCreator => {
  return (clientAction, dispatch, getState, gameClient) => {
    if (GameActionUtils.isPlayerTurn(gameClient, getState)) {
      originalActionCreator(clientAction, dispatch, getState, gameClient)
    }
  }
}

GameActionUtils.doAndDispatchNextTurn = (originalActionCreator, dispatchNextTurn) => {
  return (clientAction, dispatch, getState, gameClient) => {
    originalActionCreator(clientAction, dispatch, getState, gameClient)
    dispatchNextTurn(dispatch, getState)
  }
}

GameActionUtils.playerTurn = originalActionCreator =>
  GameActionUtils.ifPlayerTurn(
    () => GameActionUtils.doAndDispatchNextTurn(originalActionCreator))

module.exports = GameActionUtils

