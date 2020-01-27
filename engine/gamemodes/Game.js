class Game {
    constructor(players) {
        //this.mode = gamemode
        this.status = "started"
        this.players = players
        this.is_finished = false
        this.current_player_id = Math.floor(Math.random() * Math.floor(players.length))
    }
    
    get currentPlayer () {
        return this.players[this.current_player_id]
    }

}

module.exports = Game
