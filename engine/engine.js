const inquirer = require('inquirer')
const Player = require('./Player.js')
const Around_the_world = require('./gamemodes/around-the-world.js')
const The301 = require('./gamemodes/the301.js')


async function set_game_mode() {
    let answer = await inquirer  
        .prompt([
            {
                type: 'list',
                name: 'gamemode',
                message: 'Choose your gamemode :',
                choices: ['Around the world','301','Cricket']
            }
        ])
        
    return answer.gamemode
}




async function playerss() {

    
    let tab = []
    const answer = await inquirer.prompt([
            {
                type: 'input',
                message: "Nombre de joueur :",
                name: 'nb_players'
            }
        ])

    for (let i = 0; i < answer.nb_players; i++) {
            a = await create_players()
            tab.push(a)        
    }
    return tab
}


async function create_players() {
    let answer = await inquirer
        .prompt([
            {
                type: 'input',
                message: "Nom du joueur :",
                name: 'name'
            }
        ])

 
    let player = new Player(answer.name)
    return player

}




async function start() {
    process.setMaxListeners(100);
    
    let gameModes= {
        '301': The301,
        'Around the world': Around_the_world
    }
    let gamemode = await set_game_mode()
    let players = []
    players = await playerss()
    let count = 0 
    game = new gameModes[gamemode](players)

    while (!game.is_finished) {
        let turncount = 0

        game.current_player = players[count]

        

        console.log("C'est au tour de " + game.currentPlayer.name)

        while (game.currentPlayer.nb_shoot != 0 ){
            let multiples ={
                'simple': 1,
                'double': 2,
                'triple': 3
            }

            let score = []
            process.setMaxListeners(100);

            turncount += 1

            console.log("Tour n° " + turncount)

            let answer = await inquirer
                .prompt([
                    {
                        type: 'input',
                        message: "Score du joueur",
                        name: "score"
                    }
                ])

                score.push(answer.score)

            if (gamemode != 'Around the world'){
                let answers = await inquirer  
                    .prompt([
                        {
                            type: 'list',
                            name: 'multiple',
                            message: 'Which case ?',
                            choices: ['simple','double','triple']
                        }
                    ])
                    score.push( multiples[answers.multiple])

            }
            result = game.shoot(game.currentPlayer, score, game) 
            console.log(result)


                //         if (score[i]+1 == answers.score) {
                //             score[i] = Number(answers.score)
                //             console.log("Le joueur " + i + " vient de deverouiller la case " + (score[i] + 1) + " !" )

                //         }
                //         else                            
                //             console.log("Le joueur " + i + " n'a pas touché la bonne case, il doit toujours toucher la case " + (score[i] + 1) )
     
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
        //     let compteur = 0
        //     //score = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        //     while (!score.includes(20)) {
        //         compteur += 1
        //         for (let i = 1; i <= nb_players; i++) {
        //             console.log("C'est a " + i + " de jouer")
        //             for(let j = 1; j <= 3; j++) {
        //                 console.log("lancé n°" + j )
        //                 await inquirer
        //                     .prompt([
        //                         {
        //                             type: 'input',
        //                             message: "Score du joueur",
        //                             name: "score"
        //                         }
        //                     ])
        //                     .then(answers => {
        //                             if (score[i]+1 == answers.score) {
        //                                 score[i] = Number(answers.score)
        //                                 console.log("Le joueur " + i + " vient de deverouiller la case " + (score[i] + 1) + " !" )
        
        //                             }
        //                             else                            
        //                                 console.log("Le joueur " + i + " n'a pas touché la bonne case, il doit toujours toucher la case " + (score[i] + 1) )
        //                     });    
        //                 }
        //             }
        //     }
        // }
    
  /*  inquirer => list<<Joueur, mode jeux


    on creer un partie Game?js avec les jouer et le mode de jeux,
*/
/*

    {
        while jeux.is finishet == false
        inquirer shot
        //dans chaque moide de jeux mettre fonction gestion tir (handleshot) get current player dnas la classe game 
        while jeu.currentplayer.nbshoot< 3
    }
    */

start()