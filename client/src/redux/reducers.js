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

const hello = (state, action) => ({
  ...state,
  messageFromServer: action.message
})

map('init', init)
map('hello', hello)
map('updatePlayerName', updatePlayerName)
map('update', (state, action) => {
  return {
    ...state,
    ...action.state
  }
})

export const rootReducer = reducer
