const GameSelectors = require('game-selectors')
const ArrayUtils = require("array-utils")
const GameClientActionCreators = require("game-client-action-creators")

const {getCurrentTurnPlayer} = GameSelectors
const {sample} = ArrayUtils
/************************************************
 * Helpers/Shared ServerActionCreators
 ************************************************/

const ServerActionCreators = {
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
  dispatch(ServerActionCreators.nextPlayerTurn())
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

module.exports = ServerActionCreators
