import produce from "immer";

/**
 * Example usage:
 * let random = () => Math.round(Math.random() * 10)
 * let result = repeat(6) (items => [...items, random()]) ([])
 * result = [1, 5, 8, 3, 0, 2]
 *
 * @param times
 * @returns {function(*=): function(*=): (*)}
 */
export const repeat = times => f => value => {
  if (times > 0) {
    let nextValue = f(value)
    repeat(times - 1)(f)(nextValue)
  } else {
    return value
  }
}


/**
 * repeat n times.
 * times(10) (i => console.log(i))
 * @param n
 * @returns {function(*): *}
 */
export const times = n => f => repeat(n) (i => {
  f(i)
  return i+1
})(0)

export const ArrayUtils = {
  clone: function(array) {
    return [...array];
  },
  allExcept: function(array, item) {
    return array.filter(a => a !== item)
  },
  pluckRandom: function(array) {
    if (array.length === 0) {
      return null
    }
    return array.splice(ArrayUtils.sampleIndex(array), 1)[0];
  },
  sampleIndex: function(array) {
    return Math.floor(Math.random() * array.length);
  },
  sample: (array) => {
    return array[ArrayUtils.sampleIndex(array)];
  }
}

export const reduceAll = (state, ...reducers) => {
  return reducers.reduce((newState, reducer) => reducer(newState), state)
}

export const mutatorToReducer = (mutator) => (oldState, action) => produce(oldState, newState => mutator(newState, action))

export const newFromTemplate = (template) => {
  let element = template.cloneNode(true);
  element.classList.remove("hidden");
  element.attributes.removeNamedItem("id");
  return element;
};

