const inquirer = require('inquirer')

class Ltdm {
    constructor(nb_players) {
        this.nb_players = nb_players
    }

    async play_tour(nb_players) {
        let compteur = 0
        score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        while (!score.includes(20)) {
            compteur += 1
            console.log("Tour n°" + compteur)
            for (let i = 1; i <= nb_players; i++) {
                console.log("C'est au joueur " + i + " de jouer")
                for (let j = 1; j <= 3; j++) {
                    console.log("lancé n°" + j)
                    await inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: "Score du joueur",
                                name: "score"
                            }
                        ])
                        .then(answers => {
                            if (score[i] + 1 == answers.score) {
                                score[i] = Number(answers.score)
                            }
                            console.log("Le joueur " + i + " vient de deverouiller la case " + (score[i] + 1))
                        });
                }
            }
        }
    }

}