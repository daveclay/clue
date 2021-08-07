const immer = require("immer")
const produce = immer.produce

class ActionToReducerMap {
  constructor() {
    this.actionsToReducers = {}
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
      console.log(`No reducer found for ${type}`)
      return [];
    }
  }
}

class Reducers {
  constructor(options = {}) {
    this.reducerMap = new ActionToReducerMap()
    this.initialState = options.initialState || {}
  }

  map(actionFn, reducer) {
    this.reducerMap.map(actionFn, reducer)
  }

  getReduxReducerFunction() {
    return (state = this.initialState, action) => {
      return this.reducerMap.reduce(state, action);
    }
  }
}

module.exports = {
  Reducers: Reducers,
  reduceAll: (state, ...reducers) => {
    return reducers.reduce((newState, reducer) => reducer(newState), state)
  },

  mutatorToReducer: (mutator) => {
    return (oldState, action) => produce(oldState, newState => mutator(newState, action))
  }
}

