const {Sequelize, Model} = require("sequelize")
var sequelize = new Sequelize('mysql://root:@localhost:3306/dart', {})

class Player extends Model {}
Player.init({
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    gameWin:{
      type: Sequelize.INTEGER
    },
    gameLost: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE
    }
  },{
    sequelize
  }
)
  

module.exports = Player
