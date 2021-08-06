import {
  Reducers
} from "redux-utils";

const reducers = new Reducers()

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

reducers.map('init', state => state)
reducers.map('updatePlayerName', (state, action) => {
  return {
    ...state,
    addPlayerForm: {
      name: action.name
    }
  }
})

reducers.map('update', (state, action) => {
  return {
    ...state,
    ...action.state
  }
})

reducers.map("clearPlayerFormName", state => {
  return {
    ...state,
    addPlayerForm: {
      name: ""
    }
  }
})

export const rootReducer = reducers.getReduxReducerFunction()
