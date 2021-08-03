const path = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const redis = require('redis');

const redisPort = 6379
const redisHost = process.env.REDIS_URL || "localhost"

const redisClient = redis.createClient(redisPort, redisHost)
redisClient.on('connect', function() {
  console.log('Connected to redis dog');
});

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4000"
  }
});

const publicPath = path.join(__dirname, '../client/build')
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

const port = process.env.PORT || 4001

http.listen(port, function() {
  console.log(`listening on *:${port}`)
})
