const inquirer = require('inquirer')
const Player = require('./Player.js')
const Around_the_world = require('./gamemodes/around-the-world.js')
const The301 = require('./gamemodes/the301.js')


async function set_game_mode() {
    let gm = await inquirer  
        .prompt([
            {
                type: 'list',
                name: 'gamemode',
                message: 'Choose your gamemode :',
                choices: ['Around the world','301','Cricket']
            }
        ])

    return gm.gamemode
}

async function playerss() {
    let tab = []

    const nb_play = await inquirer.prompt([
            {
                type: 'input',
                message: "Numbers of players :",
                name: 'nb_players'
            }
        ])

    for (let i = 0; i < nb_play.nb_players; i++) {
            a = await create_players()
            tab.push(a)        
    }

    return tab
}


async function create_players() {
    let play_name = await inquirer
        .prompt([
            {
                type: 'input',
                message: "Player name :",
                name: 'name'
            }
        ])

    let player = new Player(play_name.name)
    return player
}


async function start() {
    
    let gamemode = await set_game_mode()
    let players = await playerss()
    let gameModes= {
        '301': The301,
        'Around the world': Around_the_world
        // 'Cricket': Cricket
    }
    game = new gameModes[gamemode](players)

    while (!game.is_finished) {
        let turncount = 0

        console.log("It's the " + game.currentPlayer.name + "'s turn")

        while (game.currentPlayer.nb_shoot != 0 ){
            let score = []
            let multiples ={
                'simple': 1,
                'double': 2,
                'triple': 3
            }
            turncount += 1

            console.log("Turn n°" + turncount)

            let case_value = await inquirer
                .prompt([
                    {
                        type: 'input',
                        message: "Player's score : ",
                        name: "score"
                    }
                ])
            score.push(case_value.score)

            if (gamemode != 'Around the world'){
                let case_multiple = await inquirer  
                    .prompt([
                        {
                            type: 'list',
                            name: 'multiple',
                            message: 'Which case multiple :',
                            choices: ['simple','double','triple']
                        }
                    ])
                score.push( multiples[case_multiple.multiple])
            }
            result = game.shoot(game.currentPlayer, score, game)
            console.log(result)
            if (game.is_finished) {
                break
            }
        }
        game.set_player_nb_shoot(game.currentPlayer)

        if (game.current_player_id == players.length - 1){
            game.current_player_id = 0
        }
        else {
            game.current_player_id += 1
        }
    }
}

start()