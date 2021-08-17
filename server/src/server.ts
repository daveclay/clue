import * as path from 'path'
import WebServer from './WebServer'

const RedisClient = require("./game/dao/RedisClient")
const GameClientHandler = require("./game/GameClientHandler")

const redisClient = new RedisClient(process.env.REDIS_URL || "redis://localhost:6379")
const gameClientHandler = new GameClientHandler(redisClient)

const webServer = new WebServer({
    assetPath: path.join(__dirname, '../../client/build'),
    port: process.env.PORT || "4001"
})

webServer.start(gameClientHandler)

