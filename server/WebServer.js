const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require("socket.io")

class WebServer {
  constructor(options) {
    this.assetPath = options.assetPath
    this.port = options.port
  }

  start() {
    const app = express()
    app.use(express.static(this.assetPath))
    app.get('*', (req, res) => {
      res.sendFile(path.join(this.assetPath, 'index.html'))
    })

    const httpServer = http.Server(app)
    const io = socketio(httpServer, {
      cors: {
        origin: "http://localhost:4000"
      }
    })

    io.on('connection', socket => {
      console.log("Socket connected: " + socket.id)
      socket.on('action', action => {
        if (action.type === 'server/hello'){
          console.log('Got hello data!', action.data)
          socket.emit('action', {
            type: "hello",
            message:'good day!'
          })
        }
      })
    })

    httpServer.listen(this.port, () => {
      console.log(`listening on *:${this.port}`)
    })
  }
}

module.exports = WebServer
