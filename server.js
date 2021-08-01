const path = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4000"
  }
});

const publicPath = path.join(__dirname, 'docs')
app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

io.on('connection', function(socket){
  console.log("Socket connected: " + socket.id);
  socket.on('action', (action) => {
    if(action.type === 'server/hello'){
      console.log('Got hello data!', action.data);
      socket.emit('action', {
        type: "hello",
        message:'good day!'
      });
    }
  });
})

const port = process.env.SERVER_PORT || 80

http.listen(port, function() {
  console.log(`listening on *:${port}`)
})
