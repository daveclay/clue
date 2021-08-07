const isServerAction = action => {
  return action && action.type && action.server
}

module.exports = {
  buildSocketIOMiddleware: (socket, criteria) => {
    return store => {
      socket.on('action', store.dispatch)
      return next => action => {
        console.log('Hi, I am socketMiddleware with action', action)
        if (criteria(action)) {
          console.log("OK then, gonna emit!")
          socket.emit('action', action)
        }
        return next(action)
      }
    }
  }
}
