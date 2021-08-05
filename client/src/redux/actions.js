import {
  getCurrentTurnPlayer,
  getPlayerByName,
} from "game-selectors";

export const init = () => ({
  type: 'init'
})

export const helloServer = () => ({
  type: 'server/hello',
  data:'Hello!'
})

export const updatePlayerName = (name) => ({
  type: 'updatePlayerName',
  name: name
})

export const addHumanPlayer = () => (dispatch, getState) => {
  const state = getState()
  if (getPlayerByName(state.players, state.client.addPlayerForm.name) != null) {
    alert(`There's already a player named ${state.client.addPlayerForm.name}`)
  } else {
    // TODO: state.client.addPlayerForm.name = ""
    dispatch({
      type: 'server/addHumanPlayer',
      player: {
        human: true,
        name: state.client.addPlayerForm.name
      }
    })
  }
}

export const addComputerPlayer = () => ({
  type: 'server/addComputerPlayer',
  player: {
    human: false
  }
})
export const nextPlayerTurn = () => ({
  type: 'server/nextPlayerTurn'
})
export const startGame = () => ({
  type: 'server/startGame'
})
export const enableComputerPlayers = () => ({
  type: 'server/enableComputerPlayers'
})
export const onRoomSelected = (roomName) => ({
  type: 'server/onRoomSelected',
  roomName
})

