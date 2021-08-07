const GameSelectors = require('game-selectors')
const ArrayUtils = require("array-utils")
const GameClientActions = require("game-client-actions")

const {getCurrentTurnPlayer} = GameSelectors
const {sample} = ArrayUtils

const Actions = {
  ...GameClientActions,
  nextPlayerTurn: () => ({
    type: 'nextPlayerTurn'
  })
}

module.exports = Actions

/************************************************
 * Helpers/Shared Actions
 ************************************************/
// TODO: see, this is an interesting problem. In the client, you can dispatch multiple actions when firing _one_ action. On the server, you're getting _one_ action to dispatch.
const dispatchNextTurn = (dispatch, getState) => {
  dispatch(Actions.nextPlayerTurn())
  const state = getState()
  const player = getCurrentTurnPlayer(state)
  if (!player.human && state.computerPlayersEnabled) {
    doComputerPlayer(dispatch, getState)
  }
}

const doComputerPlayer = (dispatch, getState) => {
  setTimeout(() => {
    const action = sample(getAvailableComputerActions(getState))
    dispatch(action)
  }, 200)
}

const getAvailableComputerActions = (getState) => {
  return computerActions
}

const moveToRandomRoom = (dispatch, getState) => {
  const state = getState()
  const randomRoom = sample(state.rooms)
  // TODO: dispatch(onRoomSelected(randomRoom.name))
}

const computerActions = [
  moveToRandomRoom
]

