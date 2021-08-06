const redis = require('redis')

class Redis {
  constructor(options) {
    this.redisClient = redis.createClient(options.port, options.host)
    this.redisClient.on('connect', () => {
      console.log('Connected to redis dog')
    })
  }
}

module.exports = Redis