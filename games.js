const players = require("./players.js")

class Games {

    constructor(){
        
    }
    async nb_players() {

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
            });
        return nb_players
    }


    async create_players() {
        let name

        await inquirer
            .prompt([
                {
                    type: 'input',
                    message: "Nom du joueur :",
                    name: 'name'
                }
            ])
            .then(answers => {
                name = answers.name
            });

        Players.new(name)

    }
}