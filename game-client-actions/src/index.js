/************************************************
 * GameClientActions
 ************************************************/

const Actions = {
  helloServer: () => ({
    type: 'hello',
    server: true,
    payload: {
      data:'Hello!'
    }
  }),

  addHumanPlayer: name => ({
    type: 'addHumanPlayer',
    server: true,
    payload: {
      player: {
        human: true,
        name: name
      }
    }
  }),

  addComputerPlayer: () => ({
    type: 'addComputerPlayer',
    server: true,
    payload: {
      player: {
        human: false
      }
    }
  }),

  startGame: () => ({
    type: 'startGame',
    server: true,
  }),

  resetGame: () => ({
    type: 'resetGame',
    server: true,
  }),

  enableComputerPlayers: () => ({
    type: 'enableComputerPlayers',
    server: true
  }),

  onRoomSelected: (roomName) => ({
    type: 'onRoomSelected',
    server: true,
    payload: {
      roomName
    }
  })
}

module.exports = Actions