const immer = require("immer")
const produce = immer.produce

class ReducerMap {
  constructor() {
    this.actionsToReducers = {}
    this.initialState = {}
  }

  map(actionFn, reducer) {
    let actionName = (typeof actionFn === 'function') ? actionFn.name : actionFn
    if (this.actionPrefix != null) {
      actionName = this.actionPrefix + actionName
    }

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

  setActionPrefix(prefix) {
    this.actionPrefix = prefix
  }
}

const reducerMap = new ReducerMap()

class ReduxUtils {
  static map(actionFn, reducer) {
    reducerMap.map(actionFn, reducer)
  }

  static actionPrefix(prefix) {
    reducerMap.setActionPrefix(prefix)
  }

  static reducer(state = reducerMap.initialState, action) {
    return reducerMap.reduce(state, action);
  }

  static reduceAll(state, ...reducers) {
    return reducers.reduce((newState, reducer) => reducer(newState), state)
  }

  static mutatorToReducer(mutator) {
    return (oldState, action) => produce(oldState, newState => mutator(newState, action))
  }
}

module.exports = ReduxUtils

