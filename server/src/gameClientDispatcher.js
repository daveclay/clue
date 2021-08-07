const ServerActionCreators = require("./ServerActionCreators")
const GameClientActionCreators = require("game-client-action-creators")

const validateGameClientAction = clientAction => GameClientActionCreators[clientAction.type] != null

const gameClientDispatcher = (clientAction, dispatch, getState, gameClient) => {
  if (validateGameClientAction(clientAction)) {
    if (ServerActionCreators[clientAction.type]) {
      const serverActionCreator = ServerActionCreators[clientAction.type]
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
    console.warn(`action ${clientAction.type} is not in ${GameClientActionCreators} - ignoring`)
    return false
  }
}

module.exports = gameClientDispatcher