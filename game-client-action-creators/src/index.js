/*************************************************************************************
 * GameClientActionCreators
 * These are Actions dispatched from the Client to the Server.
 ************************************************************************************/
module.exports = {
  helloServer: () => ({
    type: 'helloServer',
    data: 'Hello!'
  }),

  addHumanPlayer: name => ({
    type: 'addHumanPlayer',
    player: {
      human: true,
      name: name
    },
  }),

  addComputerPlayer: () => ({
    type: 'addComputerPlayer',
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

  enableComputerPlayers: () => ({
    type: 'enableComputerPlayers',
  }),

  onRoomSelected: (roomName) => ({
    type: 'onRoomSelected',
    roomName
  })
}
