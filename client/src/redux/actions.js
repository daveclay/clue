import {
  getPlayerById,
} from "game-selectors";

export const init = () => ({
  type: 'init'
})

export const updatePlayerName = (name) => ({
  type: 'updatePlayerName',
  name: name
})

export const addHumanPlayer = () => (dispatch, getState) => {
  const state = getState()
  if (getPlayerById(state.players, state.client.addPlayerForm.name) != null) {
    alert(`There's already a player named ${state.client.addPlayerForm.name}`)
  } else {
    dispatch({
      type: "clearPlayerFormName"
    })
    dispatch({
      type: 'server/addHumanPlayer',
      player: {
        human: true,
        name: state.client.addPlayerForm.name
      }
    })
  }
}
