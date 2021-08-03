/************************************************
 * Tests
 ************************************************/
import {repeat, times, ArrayUtils} from "./utils";
import {movePlayerToRoom} from "./redux/mutators";

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

describe("ArrayUtils", () => {
  it("toEquals works", () => {
    let a = ["A", "B", "C"]
    let result = ArrayUtils.allExcept(a, "B")
    expect(result).toEqual(["A", "C"])
  })
})

describe(movePlayerToRoom, () => {
  it("works", () => {
    let playerToMove = {
      name: "Baz"
    }
    let state = {
      rooms: [
        {
          name: "FooRoom",
          playerNames: [
            "Zip"
          ]
        },
        {
          name: "BarRoom",
          playerNames: [
            playerToMove.name,
            "Zang"
          ]
        }
      ]
    }
    movePlayerToRoom(state, playerToMove, "FooRoom")
    expect(state.rooms[0].playerNames).toEqual(["Zip", "Baz"])
    expect(state.rooms[1].playerNames).toEqual(["Zang"])
  })
})