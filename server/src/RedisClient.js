const redis = require('redis')

class RedisClient {
  constructor(url) {
    console.log("Connecting to redis at ", url)
    this.redisClient = redis.createClient(url);
    this.redisClient.on('connect', () => {
      console.log('Connected to redisClient dawg')
    })
  }
}

module.exports = RedisClient