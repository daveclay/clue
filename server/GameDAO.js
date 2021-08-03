class GameDAO {
  constructor(redis) {
    this.redis = redis
  }

  hi() {
    console.log(`hello from GameDAO: ${this.redis}`)
  }
}

module.exports = GameDAO
