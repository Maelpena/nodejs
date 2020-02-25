const {Sequelize, Model} = require("sequelize")
var sequelize = new Sequelize('dart', 'user', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

class Player extends Model {}
Player.init({
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    gameWin:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    gameLost: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: Sequelize.DATE
    }
  },{
    sequelize
  }
)
  

module.exports = Player
