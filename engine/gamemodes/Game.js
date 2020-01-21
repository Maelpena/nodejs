
//mode de jeux + un tableau d'instance joueur + 2 status (draft pas tres inmportant)  + un current player



class Game {
    constructor(players) {
        //this.mode = gamemode
        this.status = "started"
        this.players = players
        this.is_finished = false
        this.current_player_id = 0
    }

    get currentPlayer () {
        return this.players[this.current_player_id]
    }

}

module.exports = Game
/*
{
    id: number | string,
    mode: 'around-the-world' | '301' | 'cricket',
    name: string,
    currentPlayerId: null | string | number,
    status: 'draft' | 'started' | 'ended',
    createdAt: datetime,
   }


   */