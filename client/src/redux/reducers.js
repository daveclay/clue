import {
  Reducers
} from "redux-utils";

const reducers = new Reducers()

export const initialState = {
  client: {
    addPlayerForm: {
      name: "",
    }
  },
  currentPlayerIndex: -1,
  players: []
}

reducers.map('init', state => state)
reducers.map('updatePlayerName', (state, action) => {
  return {
    ...state,
    client: {
      ...state.client,
      addPlayerForm: {
        name: action.name
      }
    }
  }
})

reducers.map('update', (state, action) => {
  return {
    ...state,
    ...action.state,
  }
})

reducers.map("clearPlayerFormName", state => {
  return {
    ...state,
    client: {
      ...state.client,
      addPlayerForm: {
        name: ""
      }
    }
  }
})

export const rootReducer = reducers.getReduxReducerFunction()
