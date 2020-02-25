const {Sequelize, Model} = require("sequelize")
var sequelize = new Sequelize('dart', 'user', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

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
      type: Sequelize.STRING,
      defaultValue: "draft"
    },
    createdAt: {
      type: Sequelize.DATE
    }
  },{
    sequelize
  }
)
  

module.exports = Game