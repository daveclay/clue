class GameClient {
  constructor(socket) {
    this.socket = socket
  }

  getId() {
    return this.socket.id
  }

  selectState(state) {
    // TODO: select only client-visible state (specific to _this_ client's ID). So they can't see each other's cards.
    return state
  }

  update(state) {
    this.socket.emit('action', {
      type: "update",
      state: state
    })
  }
}

module.exports = GameClient