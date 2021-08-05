import { map, reducer } from "redux-utils";

export const initialState = {
  client: {
    notify: {
      message: null
    },
    addPlayerForm: {
      name: "",
    }
  },
  players: []
}

const updatePlayerName = (state, action) => {
  return {
    ...state,
    addPlayerForm: {
      name: action.name
    }
  }
}
const init = state => state

map('init', init)
map('updatePlayerName', updatePlayerName)
map('update', (state, action) => {
  return {
    ...state,
    ...action.state
  }
})

export const rootReducer = reducer
