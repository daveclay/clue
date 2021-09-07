const GameSelectors = require('game-selectors')
const Selectors = require("./selectors")
const { ArrayUtils } = require("js-utils")
const GameClientActions = require("game-client-actions")
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
    const action = sample(getAvailableComputerActions(getState))
    action(dispatch, getState)
    dispatchNextTurn(dispatch, getState)
  }, 200)
}

const getAvailableComputerActions = (getState) => {
  return computerActionCreatorFunctions
}

const moveToRandomRoom = (dispatch, getState) => {
  const state = getState()
  const randomRoom = sample(state.rooms)
  dispatch(GameClientActions.onRoomSelected(randomRoom.name))
}

const computerActionCreatorFunctions = [
  moveToRandomRoom
]

const isGameClientAlreadyPlayer = (state, gameClient) => {
  return Selectors.getPlayerIndexForGameClientId(state, gameClient.getId()) > -1
}

  /************************************************
 * The Actions
 ************************************************/
const Actions = {
  addHumanPlayer: (clientAction, dispatch, getState, gameClient) => {
    if (isGameClientAlreadyPlayer(getState(), gameClient)) {
      // TODO: tell the client NO
      console.log(`Not gonna add another player for ${gameClient.id}`)
    } else {
      dispatch({
        ...clientAction,
        gameClientId: gameClient.getId()
      })
    }
  },

  startGame: doAndDispatchNextTurn(
    (clientAction, dispatch) => dispatch(clientAction)
  ),

  onRoomSelected: doIfPlayerTurnAndDispatchNextTurn(
    (clientAction, dispatch) => dispatch(clientAction)
  ),

  nextPlayerTurn: () => ({
    type: 'nextPlayerTurn'
  }),

  /**
   * TODO: oh, this file is kinda annoying. is this isn't really an action, it's dispatching other
   * actions on behalf of a client action. It _doesn't_ reduce, though, either.
   * I guess it's annoyhing that adding an action on the client requires editing 4 files.
   *
   * Another crazy idea is the UI lives on the server. But get outta here with that.
   *
   * The server itself could export the game actions, actually. Map these things
   * to client actions by a transform function?
   */
  onPlayerSelected: (clientAction, dispatch, getState, gameClient) => ({
    type: 'onPlayerSelected',
    player: player
  })
}

module.exports = Actions
