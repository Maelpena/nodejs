const inquirer = require('inquirer')


async function nb_joueurs() {

    let nb_players

    await inquirer
        .prompt([
            {
            type: 'input',
            message: "Nombre de joueur :",
            name: 'nb_players'
            }
        ])
        .then(answers => {
            nb_players = answers.nb_players
            console.log(nb_players)
        });
        return nb_players
    }

async function play_tour(nb_players) {
    let compteur = 0
    score = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    while (!score.includes(20)) {
        compteur += 1
        console.log("Tour n°" + compteur)
        for (let i = 1; i <= nb_players; i++) {
            console.log("C'est au joueur " + i + " de jouer")
            for(let j = 1; j <= 3; j++) {
                console.log("lancé n°" + j )
                await inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: "Score du joueur",
                            name: "score"
                        }
                    ])
                    .then(answers => {
                            if (score[i]+1 == answers.score) {
                                score[i] = Number(answers.score)
                                console.log("Le joueur " + i + " vient de deverouiller la case " + (score[i] + 1) )

                            }
                            console.log("Le joueur " + i + " n'a pas touché la bonne case")
                    });    
                }
            }
    }
}

async function start() {
    let nb = await nb_joueurs()
    await play_tour(nb)
}

start()