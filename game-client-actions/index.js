/************************************************
 * GameClientActions
 ************************************************/
module.exports = {
  helloServer: () => ({
    type: 'server/hello',
    data:'Hello!'
  }),

  addComputerPlayer: () => ({
    type: 'server/addComputerPlayer',
    player: {
      human: false
    }
  }),

  startGame: () => ({
    type: 'server/startGame'
  }),

  resetGame: () => ({
    type: 'server/resetGame'
  }),

  enableComputerPlayers: () => ({
    type: 'server/enableComputerPlayers'
  }),

  onRoomSelected: (roomName) => ({
    type: 'server/onRoomSelected',
    roomName
  })
}