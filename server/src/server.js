const path = require('path')

const Redis = require("./Redis")
const GameClientHandler = require("./GameClientHandler")
const WebServer = require("./WebServer")

const redis = new Redis({
  port: 6379,
  host: process.env.REDIS_URL || "localhost"
})

const gameClientHandler = new GameClientHandler(redis)

const webServer = new WebServer({
  assetPath: path.join(__dirname, '../client/build'),
  port: process.env.PORT || 4001
})

webServer.start(gameClientHandler)

