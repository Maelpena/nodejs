const Game = require('./Game.js')

class The301 extends Game {
    
    constructor( players) {
        super( players)
        players.forEach(player => {
            player.nb_shoot= 3
            player.score = 301
        });
    }

    set_player_nb_shoot(player){
        player.nb_shoot = 3
    }

    shoot(player, tabscore, game) {
        let text
        let score = tabscore[0] * tabscore[1]

        console.log(score + " points !")

        if (tabscore[1] == 2 && player.score - score == 0){
            player.score -= score
            text = player.name + " managed to get a zero score by finishing with a double. He Won !"
            game.is_finished = true
        }

        else if (player.score - score > 1) {
            player.score -= score
            text = player.name + " now has " + player.score + " points"
        }
        else if  (player.score - score == 0) {
            text = player.name + " managed to get a zero score but not ending with a double. So he still has a score of " + player.score + " points"

        }
        else {
            text = player.name + " scored too high. So he still has a score of  " + player.score 

        }


        player.nb_shoot -= 1
        console.log(player.nb_shoot)
        return text
    }
}

module.exports = The301