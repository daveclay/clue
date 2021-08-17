/*************************************************************************************
 * GameClientActions
 * These are Actions dispatched from the Client to the Server.
 ************************************************************************************/
module.exports = {
  helloServer: () => ({
    type: 'helloServer',
    data: 'Hello!'
  }),

  addHumanPlayer: name => ({
    type: 'addPlayer',
    player: {
      human: true,
      name: name
    },
  }),

  addComputerPlayer: () => ({
    type: 'addPlayer',
    player: {
      human: false
    }
  }),

  startGame: () => ({
    type: 'startGame',
  }),

  resetGame: () => ({
    type: 'resetGame',
  }),

  onRoomSelected: (roomName) => ({
    type: 'onRoomSelected',
    roomName
  })
}
