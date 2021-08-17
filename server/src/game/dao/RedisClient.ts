const redis = require('redis')

class RedisClient {
  /** @type {number | undefined} */
  redisClient: undefined

  constructor(url: String) {
    console.log("Connecting to redis at ", url)
    this.redisClient = redis.createClient(url);
    // @ts-ignore
    this.redisClient.on('connect', () => {
      console.log('Connected to redisClient dawg')
    })
  }
}

module.exports = RedisClient