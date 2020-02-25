const {Sequelize, Model} = require("sequelize")
var sequelize = new Sequelize('dart', 'user', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})
class GamePlayer extends Model {}
GamePlayer.init({
     
  playerId: {
    type: Sequelize.INTEGER
  },
  gameId: {
    type: Sequelize.INTEGER
  },
  remainingShots:{
    type: Sequelize.INTEGER
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  rank: {
    type: Sequelize.INTEGER
  },
  order: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.DATE
  }

  },{
    sequelize
  }
)
  

module.exports = GamePlayer








