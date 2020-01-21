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
        console.log("Vous faite " + score + " points !")


        if (player.score - score > 1)
            player.score -= score

            if ((player.score - score) %2 == 0 ) {
                player.score -= score
                text = player.name + " a un total de " + player.score + " point"


        }
        
        else {
            text = player.name + " a raté la case " + player.target + ", il doit retenter !"

        }
        player.nb_shoot -= 1
        console.log(player.nb_shoot)
        return text
    }
}

module.exports = The301