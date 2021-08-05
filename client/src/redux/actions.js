import {
  getCurrentTurnPlayer,
  getPlayerByName,
} from "game-selectors";
import { sample } from "array-utils"


export const init = () => ({
  type: 'init'
})

export const helloServer = () => ({
  type: 'server/hello',
  data:'Hello!'
})

export const updatePlayerName = (name) => ({
  type: 'server/updatePlayerName',
  name: name
})

export const addHumanPlayer = () => (dispatch, getState) => {
  const state = getState()
  if (getPlayerByName(state.players, state.addPlayerForm.name) != null) {
    alert(`There's already a player named ${state.addPlayerForm.name}`)
  } else {
    // TODO: state.addPlayerForm.name = ""
    dispatch({
      type: 'server/addHumanPlayer',
      player: {
        human: true,
        name: state.addPlayerForm.name
      }
    })
  }
}

export const addComputerPlayer = () => ({
  type: 'addComputerPlayer',
  player: {
    human: false
  }
})
export const nextPlayerTurn = () => ({
  type: 'nextPlayerTurn'
})
export const startGame = () => (dispatch, getState) => {
  dispatch({
    type: 'startGame'
  })
  dispatchNextTurn(dispatch, getState)
}
export const enableComputerPlayers = () => ({
  type: 'enableComputerPlayers'
})
export const onRoomSelected = (roomName) => (dispatch, getState) => {
  dispatch({
    type: 'onRoomSelected',
    roomName
  })
  dispatchNextTurn(dispatch, getState)
}

/************************************************
 * Helpers/Shared Actions
 ************************************************/
const dispatchNextTurn = (dispatch, getState) => {
  dispatch(nextPlayerTurn())
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
  dispatch(onRoomSelected(randomRoom.name))
}

const computerActions = [
  moveToRandomRoom
]

