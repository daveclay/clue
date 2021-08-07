const GameSelectors = require('game-selectors')
const ArrayUtils = require("array-utils")
const GameClientActionCreators = require("game-client-action-creators")

const {getCurrentTurnPlayer} = GameSelectors
const {sample} = ArrayUtils

const Actions = {
  startGame: (clientAction, dispatch, getState) => {
    dispatch(clientAction)
    dispatchNextTurn(dispatch, getState)
  },
  nextPlayerTurn: () => ({
    type: 'nextPlayerTurn'
  })
}

module.exports = Actions

/************************************************
 * Helpers/Shared Actions
 ************************************************/
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
  dispatch(GameClientActionCreators.onRoomSelected(randomRoom.name))
}

const computerActions = [
  moveToRandomRoom
]

