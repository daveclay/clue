const isServerAction = action => {
  return action && action.type && action.server
}

module.exports = {
  buildSocketIOMiddleware: (socket, criteria) => {
    return store => {
      socket.on('action', action => {
        console.log("action from server: ", action)
        store.dispatch(action)
      })
      return next => action => {
        console.log('Hi, I am socketMiddleware with action', action)
        if (criteria(action)) {
          console.log("OK then, gonna emit this action", action)
          socket.emit('action', action)
        }
        return next(action)
      }
    }
  }
}
