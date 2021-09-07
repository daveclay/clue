const ServerActions = require("./redux/actions")
const GameClientActions = require("game-client-actions")

const validateGameClientAction = clientAction => GameClientActions[clientAction.type] != null

const gameClientDispatcher = (clientAction, dispatch, getState, gameClient) => {
  if (validateGameClientAction(clientAction)) {
    if (ServerActions[clientAction.type]) {
      // TODO: Should this defer to GameClient, and then GameClient handles its own?
      const serverActionCreator = ServerActions[clientAction.type]
      if (typeof serverActionCreator === 'function') {
        serverActionCreator(clientAction, dispatch, getState, gameClient)
      } else {
        console.error(`${clientAction.type} mapped to invalid action creator - must be a function, bruh`, serverActionCreator)
        return false
      }
    } else {
      dispatch(clientAction)
    }
    return true
  } else {
    console.warn(`action ${clientAction.type} is not in ${GameClientActions} - ignoring`)
    return false
  }
}

module.exports = gameClientDispatcher