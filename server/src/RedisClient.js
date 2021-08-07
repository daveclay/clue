const redis = require('redis')

class RedisClient {
  constructor(options) {
    this.redisClient = redis.createClient(options.port, options.host)
    this.redisClient.on('connect', () => {
      console.log('Connected to redisClient dog')
    })
  }
}

module.exports = RedisClient