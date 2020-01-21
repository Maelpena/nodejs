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
            text = player.name + " unlock the case number " + player._target + " !"
            if (score == 20){
                game.is_finished = true
                text = player.name + " win !"
            }

        }
        else {
            text = player.name + " miss the case number " + player.target + ", may be next turn !"

        }
        player.set_nb_shoot(player.get_nb_shoot() - 1)
        return text
    }
}

module.exports = Around_the_world