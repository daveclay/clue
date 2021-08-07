const path = require('path')

const RedisClient = require("./RedisClient")
const GameClientHandler = require("./GameClientHandler")
const WebServer = require("./WebServer")

const redisClient = new RedisClient(process.env.REDIS_URL || "redis://localhost:6379")

const gameClientHandler = new GameClientHandler(redisClient)

const webServer = new WebServer({
  assetPath: path.join(__dirname, '../../client/build'),
  port: process.env.PORT || 4001
})

webServer.start(gameClientHandler)

