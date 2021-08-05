class GameClient {
  constructor(socket) {
    this.socket = socket
  }

  getId() {
    return this.socket.id
  }

  selectState(state) {
    return state
  }

  update(state) {
    this.socket.emit('action', {
      type: "hello",
      message:'good day!'
    })
  }
}

module.exports = GameClient