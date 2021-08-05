
class ArrayUtils {
  /**
   * Example usage:
   * let random = () => Math.round(Math.random() * 10)
   * let result = repeat(6) (items => [...items, random()]) ([])
   * result = [1, 5, 8, 3, 0, 2]
   *
   * @param times
   * @returns {function(*=): function(*=): (*)}
   */
  static repeat(times) {
    return f => value => {
      if (times > 0) {
        let nextValue = f(value)
        ArrayUtils.repeat(times - 1)(f)(nextValue)
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
  static times(n) {
    return f => ArrayUtils.repeat(n)(i => {
      f(i)
      return i + 1
    })(0)
  }

  static clone(array) {
    return [...array];
  }

  static allExcept(array, item) {
    return array.filter(a => a !== item)
  }

  static pluckRandom(array) {
    if (array.length === 0) {
      return null
    }
    return array.splice(ArrayUtils.sampleIndex(array), 1)[0];
  }

  static sampleIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  static sample(array) {
    return array[ArrayUtils.sampleIndex(array)];
  }
}

module.exports = ArrayUtils