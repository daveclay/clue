/************************************************
 * Tests
 ************************************************/
import { repeat, times, allExcept } from "./index.js";

describe("repeat", () => {
  it("repeats", () => {
    let items = []
    repeat(5)(i => {
      items.push(i)
      return i + 2
    })(1)

    expect(items).toEqual([1, 3, 5, 7, 9])
  })
})

describe("times", () => {
  it("times with index", () => {
    let items = []
    times(5)(i => items.push(i))

    expect(items).toEqual([0, 1, 2, 3, 4])
  })
})

describe("allExcept", () => {
  it("toEquals works", () => {
    let a = ["A", "B", "C"]
    let result = allExcept(a, "B")
    expect(result).toEqual(["A", "C"])
  })
})