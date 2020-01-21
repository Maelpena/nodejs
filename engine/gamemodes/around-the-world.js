const Game = require('./Game.js')

class Around_the_world extends Game {
    
    constructor( players) {
        super( players)
        players.forEach(player => {
            player.set_target(1) 
            player.set_nb_shoot(3)
        });
    }

    set_player_nb_shoot(player){
        player.nb_shoot = 3
    }

    shoot(player, score, game) {
        let text
        

        if (score == player.target ) {
            player.set_target(player._target + 1)
            text = player.name + " vient de deverouiller la cazzzse " + player._target + " !"
            if (score == 20){
                game.is_finiched = true
                text = player.name + " a gagné, il a atteint la case 20 !"
            }

        }
        else {
            text = player.name + " a raté la case " + player.target + ", il doit retenter !"

        }
        player.set_nb_shoot(player.get_nb_shoot() - 1)
        return text
    }
}

module.exports = Around_the_world