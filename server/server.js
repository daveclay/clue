const path = require('path')

const Redis = require("./Redis")
const GameDAO = require("./GameDAO")
const WebServer = require("./WebServer")

const redis = new Redis({
  port: 6379,
  host: process.env.REDIS_URL || "localhost"
})

new GameDAO(redis).hi()

const webServer = new WebServer({
  assetPath: path.join(__dirname, '../client/build'),
  port: process.env.PORT || 4001
})

webServer.start()

