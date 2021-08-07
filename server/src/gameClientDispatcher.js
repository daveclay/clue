const ServerActionCreators = require("./ServerActionCreators")
const GameClientActionCreators = require("game-client-action-creators")

const validateGameClientAction = clientAction => GameClientActionCreators[clientAction.type] != null

const gameClientDispatcher = (clientAction, dispatch, getState) => {
  if (validateGameClientAction(clientAction)) {
    if (ServerActionCreators[clientAction.type]) {
      const serverActionCreator = ServerActionCreators[clientAction.type]
      if (typeof serverActionCreator === 'function') {
        serverActionCreator(clientAction, dispatch, getState)
      } else {
        dispatch(serverActionCreator(clientAction))
      }
    } else {
      dispatch(clientAction)
    }
    return true
  } else {
    console.warn(`action ${clientAction.type} is not in ${GameClientActionCreators} - ignoring`)
    return false
  }
}

module.exports = gameClientDispatcher