const Selectors = require("./redux/selectors")
const GameSelectors = require("game-selectors")

class GameClient {
  constructor(socket) {
    this.socket = socket
  }

  getId() {
    return this.socket.id
  }

  selectState(state) {
    return {
      characters: state.characters,
      rooms: state.rooms,
      weapons: state.weapons,
      players: state.players, // TODO: hide the game client id? That should be private.
      playerIndex: Selectors.getPlayerIndexForGameClientId(state, this.socket.id),
      playerCards: Selectors.playerCards(state, this.socket.id),
      allCards: Selectors.allCards(state),
      currentTurnPlayerIndex: state.currentTurnPlayerIndex,
      gameStarted: state.gameStarted,
      notify: state.notify
    }
  }

  update(state) {
    this.socket.emit('action', {
      type: "update",
      state: state
    })
  }
}

module.exports = GameClient