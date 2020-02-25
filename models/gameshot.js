const {Sequelize, Model} = require("sequelize")
var sequelize = new Sequelize('dart', 'user', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})
class GameShot extends Model {}
GameShot.init({
      
  gameId: {
    type: Sequelize.INTEGER
  },
  playerId: {
    type: Sequelize.INTEGER
  },
  multiplicator:{
    type: Sequelize.INTEGER
  },
  sector: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
  
  },{
    sequelize
  }
)
  

module.exports = GameShot 