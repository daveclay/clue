const GameSelectors = require('game-selectors')
const { ArrayUtils } = require("js-utils")
const GameClientActionCreators = require("game-client-actions")
const {
  doIfPlayerTurn
} = require("./utils/GameActionUtils")

const {getCurrentTurnPlayer} = GameSelectors
const {sample} = ArrayUtils
/************************************************
 * Helpers
 ************************************************/

/**
 * Execute the actionFn if it's the player's turn, and then move to the next player's turn
 * @param actionFn
 */
const doIfPlayerTurnAndDispatchNextTurn = actionFn => doIfPlayerTurn(
  (clientAction, dispatch, getState, gameClient) => {
    actionFn(clientAction, dispatch, getState, gameClient)
    dispatchNextTurn(dispatch, getState)
  }
)

/**
 * Execute the actionFn and dispatch the next player's turn. NOTE that this does not
 * check whether it is the current player's turn.
 * @param actionFn
 * @returns {(function(*, *=, *=, *): void)|*}
 */
const doAndDispatchNextTurn = actionFn => (clientAction, dispatch, getState, gameClient) => {
  actionFn(clientAction, dispatch, getState, gameClient)
  dispatchNextTurn(dispatch, getState)
}

/************************************************
 * The Actions
 ************************************************/
const Actions = {
  addHumanPlayer: (clientAction, dispatch, getState, gameClient) => {
    dispatch({
      ...clientAction,
      gameClientId: gameClient.getId()
    })
  },

  startGame: doAndDispatchNextTurn(
    (clientAction, dispatch) => dispatch(clientAction)
  ),

  onRoomSelected: doIfPlayerTurnAndDispatchNextTurn(
    (clientAction, dispatch) => dispatch(clientAction)
  ),

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
