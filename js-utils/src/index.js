const ObjectUtils = {}

ObjectUtils.updateValues = object => {
  return fn => Object.fromEntries(Object.entries(object).map(entry => [entry[0], fn(entry[0], entry[1])]))
}

const IteratorUtils = {}

/**
 * Example usage:
 * let random = () => Math.round(Math.random() * 10)
 * let result = repeat(6) (items => [...items, random()]) ([])
 * result = [1, 5, 8, 3, 0, 2]
 *
 * @param times
 * @returns {function(*=): function(*=): (*)}
 */
IteratorUtils.repeat = times => {
  return f => value => {
    if (times > 0) {
      let nextValue = f(value)
      IteratorUtils.repeat(times - 1)(f)(nextValue)
    } else {
      return value
    }
  }
}

/**
 * repeat n times.
 * times(10) (i => console.log(i))
 * @param n
 * @returns {function(*): *}
 */
IteratorUtils.times = n => {
  return f => IteratorUtils.repeat(n)(i => {
    f(i)
    return i + 1
  })(0)
}

const ArrayUtils = {}

ArrayUtils.clone = array => {
  return [...array];
}

ArrayUtils.allExcept = (array, item) => {
  return array.filter(a => a !== item)
}

ArrayUtils.pluckRandom = array => {
  if (array.length === 0) {
    return null
  }
  return array.splice(ArrayUtils.sampleIndex(array), 1)[0];
}

ArrayUtils.sampleIndex = array => {
  return Math.floor(Math.random() * array.length);
}

ArrayUtils.sample = array => {
  return array[ArrayUtils.sampleIndex(array)];
}

module.exports = {
  ObjectUtils: ObjectUtils,
  IteratorUtils: IteratorUtils,
  ArrayUtils: ArrayUtils
}