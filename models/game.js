const {Sequelize, Model} = require("sequelize")
var sequelize = new Sequelize('mysql://root:@localhost:3306/dart', {})

class Game extends Model {}
Game.init({
    mode: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    currentPlayerId:{
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    }
  },{
    sequelize
  }
)
  

module.exports = Game