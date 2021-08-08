const GameSelectors = require('game-selectors')
const { ArrayUtils } = require("js-utils")
const GameClientActionCreators = require("game-client-actions")

const {getCurrentTurnPlayer} = GameSelectors
const {sample} = ArrayUtils
/************************************************
 * Helpers/Shared ServerActionCreators
 ************************************************/

/*
TODO: if it's not the player's turn, don't let them do certain actions. Does that belong in the actions? Yeah.
How? IF the clietn sends an action, it's by default allowed to pass-through. There already is this:
validateGameClientAction = clientAction => GameClientActionCreators[clientAction.type] != null
So maybe that can be "injected", allowing dynamic valid actions from the client at certain times.

Also, I feel like the action belongs with the reducer (verticals) rather than component type (horizontals)
 */

const Actions = {
  startGame: (clientAction, dispatch, getState) => {
    dispatch(clientAction)
    dispatchNextTurn(dispatch, getState)
  },
  addHumanPlayer: (clientAction, dispatch, getState, gameClient) => {
    dispatch({
      ...clientAction,
      gameClientId: gameClient.getId()
    })
  },
  onRoomSelected: (clientAction, dispatch, getState) => {
    dispatch(clientAction)
    dispatchNextTurn(dispatch, getState)
  },
  nextPlayerTurn: () => ({
    type: 'nextPlayerTurn'
  })
}

const dispatchNextTurn = (dispatch, getState) => {
  dispatch(Actions.nextPlayerTurn())
  const state = getState()
  const player = getCurrentTurnPlayer(state)
  if (!player.human) {
    doComputerPlayer(dispatch, getState)
  }
}

const doComputerPlayer = (dispatch, getState) => {
  setTimeout(() => {
    const actionCreatorFunctions = sample(getAvailableComputerActionCreatorFunctions(getState))
    actionCreatorFunctions(dispatch, getState)
    dispatchNextTurn(dispatch, getState)
  }, 200)
}

const getAvailableComputerActionCreatorFunctions = (getState) => {
  return computerActionCreatorFunctions
}

const moveToRandomRoom = (dispatch, getState) => {
  const state = getState()
  const randomRoom = sample(state.rooms)
  dispatch(GameClientActionCreators.onRoomSelected(randomRoom.name))
}

const computerActionCreatorFunctions = [
  moveToRandomRoom
]

module.exports = Actions
