const router = require('express').Router()
const Game = require("../models/game.js")
const GamePlayer = require("../models/gameplayer.js")
const GameShot = require("../models/gameshot.js")
const Player = require("../models/player.js")
const {Sequelize} = require("sequelize")

const override = require('method-override');
router.use(override('_override'))

router.get('/', async (req, res, next) => {
    
    const game = await Game.findAll()


    let limit = parseInt(req.query.limit) || 10
    let page = parseInt(req.query.page)
    let sort = req.query.sort
    let reverse = req.query.reverse
    let fstatus = req.query['f.status']


    res.format ({

        html: function() { res.render('./game/main', {
            game: game, 
            limit: limit,
            page: page, 
            sort: sort,
            reverse: reverse, 
            fstatus: fstatus
        })},

        json: function() { res.json(Game) }
    })
})  

// GET /games/new

router.get('/new', (req, res, next) => {
    res.format ({

      html: function() { res.render('./game/new') },

      json: function() { res.json("406 NOT_API_AVAILABLE") }
      
    })

})

// POST /games

router.post('/', async (req, res, next) => {
    const game = await Game.create({name: req.body.name, mode: req.body.mode})
    res.format ({

        html: function() { res.redirect(`./games/${game.id}`)},

        json: function() { res.json(201, game)}
    })
})

// GET /games/{id}
router.get('/:gameId', async (req, res, next) => {

    const game = await Game.findOne({where: {id: req.params.gameId}})
    const lastshots = await GameShot.findAll({where: {gameId: req.params.gameId}})
    const gameplayers = await GamePlayer.findAll({where: {gameId: req.params.gameId}})
    const currentplayer = await GamePlayer.findOne({where: {playerId: game.currentPlayerId}})

    let players = []
    for (let i = 0; i < gameplayers.length; i++) {
        const player = await Player.findOne({where: {id: gameplayers[i].playerId}})
        players.push(player)
        console.log("")
        console.log(currentplayer)
        console.log("")
    }

    console.log("")
    console.log(currentplayer)
    console.log("")
    res.format ({
        html: function() {res.render('./game/show', {
            players: players,
            game: game,
            gameplayers: gameplayers,
            currentplayer: currentplayer,
            shots: lastshots
            }) 
        },
        json: function() {res.json(players)}
    })
})

// GET /games/{id}/edit

router.get('/:gameId/edit', async (req, res, next) => {
    const game = await Game.findOne({where: {id: req.params.gameId}})
        res.format ({

        html: function() { res.render('./game/edit', {
            game: game
        }) },

        json: function() { res.json("406 NOT_API_AVAILABLE") }
        
      
    })
})

// PATCH /games/{id}

router.patch('/:gameId', async (req, res, next) => {
    console.log('je suis dans le patch', req.body)
    const game = await Game.update({name: req.body.name, mode: req.body.mode, status: req.body.status }, {where: {id: req.params.gameId}})
    if (req.body.status == "started"){

        const gameplayers = await GamePlayer.findAll({where: {gameId: req.params.gameId}})
        let rank = 0
        gameplayers.forEach( async player => {
            console.log("")
            console.log("je suis dans la boucle")
            console.log(rank)
            rank = rank + 1

            await GamePlayer.update({rank: rank},{where: {playerId: player.playerId, gameId: player.gameId}})
        })
            
        var current = gameplayers[1]
        var cur = current.playerId

        await Game.update({currentPlayerId: cur}, {where: {id: req.params.gameId}})

        if (req.body.mode == "301"){
            await GamePlayer.update({score: 301, remainingShots: 3}, {where: {gameId: req.params.gameId}})
        }
        else if (req.body.mode == "Around the world"){
            await GamePlayer.update({score: 0, remainingShots: 3}, {where: {gameId: req.params.gameId}})
        }
    }
    
    res.format ({

        html: function() { res.redirect(`/games/${req.params.gameId}`) },

        json: function() { res.json(200, game) }
    })
})

// DELETE /games/{id}

router.delete('/:gameId', async (req, res, next) => {
    await Game.destroy({where: {id: req.params.gameId}})
    res.format ({

        html: function() { res.redirect('/games') },
    
        json: function() { res.json(204) } 
    
    })  
})

// GET /games/{id}/players

router.get('/:gameId/players', async (req, res, next) => {
    const players = await Player.findAll()
    const gameplayers = await GamePlayer.findAll({where: {gameId: req.params.gameId}})
    res.format ({

        html: function() { res.render('./game/gameplayers', {
            gameId: req.params.gameId,
            players: players,
            gameplayers: gameplayers
        }) },

        json: function() { res.json(players) }   
    })
})

// POST /games/{id}/players 

router.post('/:gameId/players', async (req, res, next) => {
    await GamePlayer.destroy({where: {gameId: req.params.gameId}})
    
    let playerIdArray = req.body.players
    playerIdArray.forEach( async id => {
            await GamePlayer.create({ gameId: req.params.gameId, playerId: id })
        }
    )
    res.format ({
        html: function() {res.redirect(`/games/${req.params.gameId}/players`)},
        json: function() {res.json(204)}
    })
})

// DELETE /games/{id}/players

router.delete('/:gameId/players', async (req, res, next) => {
    await GamePlayer.destroy({where: {playerId: req.query.playerId, gameId: req.params.gameId}})
    res.format ({

        html: function() { res.redirect(`/games/${req.params.gameId}/players`) }, 
    
        json: function() { res.json(204) }
        
    })    
})

// POST /games/{id}/shots

router.post('/:gameId/shots', async (req, res, next) => {
    const game = await Game.findOne({where: {id: req.params.gameId}})
    const shot = await GameShot.create({sector: req.body.sector, multiplicator: req.body.multiplicator, gameId: game.id, playerId: game.currentPlayerId})
    const gameplayer = await GamePlayer.findOne({where: {playerId: game.currentPlayerId, gameId: game.id}})
    let newremainingshot =  gameplayer.remainingShots - 1 
    await GamePlayer.update({remainingShots: newremainingshot },{where: {playerId: game.currentPlayerId}})

    if (newremainingshot <= 0) {
        let maxrank = 0
        await GamePlayer.update({remainingShots: 3 },{where: {playerId: gameplayer.playerId}})
        const gameplayers = await GamePlayer.findAll({where: {gameId: game.id}})
        gameplayers.forEach(player => {
            if (player.rank > maxrank){
                maxrank = player.rank
            }
        })

        if (gameplayer.rank == maxrank) {
            const firstgameplayer = await GamePlayer.findOne({where: {rank: 1, gameId: game.id}})
            await Game.update({currentPlayerId: firstgameplayer.playerId},{where: {id: game.id}})
        }
        else {
            let newrank = gameplayer.rank + 1
            const nextgameplayer = await GamePlayer.findOne({where: {rank: newrank, gameId: game.id}})
            Game.update({currentPlayerId: nextgameplayer.playerId},{where: {id: game.id}})
        }
    }

    
    switch (game.mode) {
        case "Around the world":
            if (shot.sector == gameplayer.score + 1 ) {
                let target = parseInt(shot.sector) 
                console.log("valeur du newshot :", target)
                await GamePlayer.update({score: target},{where: {playerId: game.currentPlayerId}})

                //text = player.name + " unlock the case number " + player._target + " !"
                if (gameplayer.score == 19){
                    await Game.update({status: "ended"},{where: {id: game.id}})
                    const winner = await Player.findOne({where: {id: gameplayer.playerId}})
                    await Player.update({gameWin: winner.gameWin + 1}, {where: {id: winner.id}})

                    //text = player.name + " win !"
                }

            }


        case "301":
            let shotscore = shot.sector * shot.multiplicator
            let newscore = gameplayer.score - shotscore
            
            if (shot.multiplicator == 2 && newscore == 0){
                await GamePlayer.update({score: newscore },{where: {playerId: game.currentPlayerId}})
                await Game.update({status: "ended"},{where: {id: game.id}})
                const winner = await Player.findOne({where: {id: gameplayer.playerId}})
                await Player.update({gameWin: winner.gameWin + 1}, {where: {id: winner.id}})
            }

            else if (newscore > 1) {
                await GamePlayer.update({score: newscore },{where: {playerId: game.currentPlayerId}})
            }

            else if  (gameplayer.score - shotscore == 0) {
                //text = player.name + " managed to get a zero score but not ending with a double. So he still has a score of " + player.score + " points"
                
            }
            else {
                //text = player.name + " scored too high. So he still has a score of  " + player.score 
            
            }
    }

    res.format ({

        html: function() { res.redirect(`/games/${req.params.gameId}`) },

        json: function() { res.json(204) }
    })
})


module.exports = router
