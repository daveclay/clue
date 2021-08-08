const GameActionUtils = require('./GameActionUtils');

const {
  ifPlayerTurn
} = GameActionUtils

let clientAction = {}
let dispatch = jest.fn((action) => {})
let gameClient = {}
let getState = () => {}

describe('GameActionUtils', () => {
  describe('ifPlayerTurn', () => {
    describe("when it is the player's turn", () => {
      beforeEach(() => {
        GameActionUtils.isPlayerTurn = jest.fn((gameClient, getState) => true)
      })
      it('calls the function', () => {
        let fn = jest.fn((clientAction, dispatch, getState, gameClient) => {})
        let composedFn = ifPlayerTurn(fn)
        composedFn(clientAction, dispatch, getState, gameClient)
        expect(fn.mock.calls.length).toBe(1)
      })
    })
    describe("when it is NOT the player's turn", () => {
      beforeEach(() => {
        GameActionUtils.isPlayerTurn = jest.fn((gameClient, getState) => false)
      })
      it('does NOT call the function', () => {
        let fn = jest.fn((clientAction, dispatch, getState, gameClient) => {})
        let composedFn = ifPlayerTurn(fn)
        composedFn(clientAction, dispatch, getState, gameClient)
        expect(fn.mock.calls.length).toBe(0)
      })
    })
  });
});
