const immer = require("immer")
const produce = immer.produce

class ReducerMap {
  constructor() {
    this.actionsToReducers = {}
    this.initialState = {}
  }

  map(actionFn, reducer) {
    let actionName = (typeof actionFn === 'function') ? actionFn.name : actionFn
    if (!this.actionsToReducers[actionName]) {
      this.actionsToReducers[actionName] = [];
    }
    let reducers = this.actionsToReducers[actionName];
    reducers[reducers.length] = reducer;
  }

  reduce(startState, action) {
    return this.getReducersForAction(action).reduce((state, reducer) =>
        reducer(state, action), startState);
  }

  getReducersForAction(action) {
    let type = action.type;
    let reducers = this.actionsToReducers[type];
    if (reducers) {
      return reducers;
    } else {
      if (!type.startsWith("server/") && type !== "@@INIT") {
        console.log(`No reducer found for ${type}`)
      }
      return [];
    }
  }
}

const reducerMap = new ReducerMap();

const map = (actionFn, reducer) => {
  reducerMap.map(actionFn, reducer);
}

const reducer = function reducer(state = reducerMap.initialState, action) {
  return reducerMap.reduce(state, action);
}

const reduceAll = (state, ...reducers) => {
  return reducers.reduce((newState, reducer) => reducer(newState), state)
}

const mutatorToReducer = (mutator) => (oldState, action) => produce(oldState, newState => mutator(newState, action))

module.exports = {
  map: map,
  reducer: reducer,
  reduceAll: reduceAll,
  mutatorToReducer: mutatorToReducer
}

