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

map('init', state => state)
map('updatePlayerName', (state, action) => {
  return {
    ...state,
    addPlayerForm: {
      name: action.name
    }
  }
})

map('update', (state, action) => {
  return {
    ...state,
    ...action.state
  }
})

map("clearPlayerFormName", state => {
  return {
    ...state,
    addPlayerForm: {
      name: ""
    }
  }
})

export const rootReducer = reducer
