class GameClient {
  socket: Socket
  constructor(socket) {
    this.socket = socket
  }

  getId() {
    return this.socket.id
  }

  selectState(state) {
    // TODO: select only client-visible state (specific to _this_ client's ID). So they can't see each other's cards.
    // TODO: also, which player this client is (the client _could_ keep it from addHumanPlayer, but shrug).
    // TODO: this would be easier with a basic construct of "private" vs "public" store shape
    // Then there'd be private state, shared client state, and state that the client needs to know about itself (current player?)
    // Oh, but also some things are private within the structure (e.g. player.gameClientId)
    // Super-hypothetical: schema that takes into account _time_ (conditions, I guess, nt hypothetical)
    // if gameStarted == true then players should be non []
    return {
      characters: state.characters,
      gameStarted: state.gameStarted,

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