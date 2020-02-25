const router = require('express').Router()
const Game = require("../models/game.js")
const GamePlayer = require("../models/gameplayer.js")
const GameShot = require("../models/gameshot.js")
const Player = require("../models/player.js")
const {Sequelize} = require("sequelize")

const override = require('method-override');
router.use(override('_override'))

//GET /
/*    router.get('/', (req, res, next) => {
        res.format ({

            html: function(){ res.redirect('/games') },
            
            json: function() {  res.json("406 NOT_API_AVAILABLE") }
            
        })
    })
*/
// GET /games

router.get('/', (req, res, next) => {
    
    Game.findAll().then((game) => {


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


    .catch((err) => {
        next(new Error(err))
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

router.post('/', (req, res, next) => {
    console.log('body: ', req.body)
    Game.create({name: req.body.name, mode: req.body.mode}).then((game) => {
        res.format ({

            html: function() { res.redirect(`./games/${game.id}`)},

            json: function() { res.json(201, game)}
        
        })
    })




})

// GET /games/{id}
router.get('/:gameId', (req, res, next) => {
    var currentplayer
    Game.findOne({where: {id: req.params.gameId}}).then( (game) => {

        GameShot.findAll({where: {gameId: req.params.gameId}}).then( (shots) => {
            
            GamePlayer.findAll({where: {gameId: req.params.gameId}}).then((players) => {

                Player.findOne({where: {id: game.currentPlayerId}}).then((currentplayer) => {

                    console.log(players)

                    res.format ({
                        html: function() {res.render('./game/show', {
                            game: game,
                            players: players,
                            currentplayer: currentplayer,
                            shots: shots
                            }) 
                        },
                        json: function() {res.json(players)}
                    })
                })
            })
        })
    })
})

// GET /games/{id}/edit

router.get('/:gameId/edit', (req, res, next) => {
    Game.findOne({where: {id: req.params.gameId}}).then((game) => {
        res.format ({

        html: function() { res.render('./game/edit', {
            game: game
        }) },

        json: function() { res.json("406 NOT_API_AVAILABLE") }
        
        })
    })
})

// PATCH /games/{id}

router.patch('/:gameId', async (req, res, next) => {
    console.log('je suis dans le patch', req.body)
    await Game.update({name: req.body.name, mode: req.body.mode, status: req.body.status }, {where: {id: req.params.gameId}}).then((game) => {
        if (req.body.status == "started"){
            if (req.body.mode == "301"){
                GamePlayer.update({score: 301, remainingShots: 3}, {where: {gameId: req.params.gameId}}).then(() => {
                    GamePlayer.findAll({where: {gameId: req.params.gameId}}).then((players) => {
                        let rank = 0
                        players.forEach(  player => {
                            console.log("")
                            console.log("je suis dans la boucle")
                            console.log(rank)
                            GamePlayer.update({rank: rank},{where: {playerId: player.playerId, gameId: player.gameId}}).then(() => {})
                            rank = rank + 1
                        })
                        
                    console.log("gamesplayers updated tot 301")
                        var current = players[1]
                        var cur = current.playerId

                        Game.update({currentPlayerId: cur}, {where: {id: req.params.gameId}}).then(() => {

                        })
                    })
                })
            }
        }
        
        res.format ({


        html: function() { res.redirect(`/games/${req.params.gameId}`) },

        json: function() { res.json(200, game) }
        
        })
    })

})

// DELETE /games/{id}

router.delete('/:gameId', (req, res, next) => {
    Game.destroy({where: {id: req.params.gameId}}).then(() => {
        res.format ({

            html: function() { res.redirect('/games') },
      
            json: function() { res.json(204) } 
        })
    })  
})

// GET /games/{id}/players

router.get('/:gameId/players', (req, res, next) => {
    Player.findAll().then((players) => {
        GamePlayer.findAll({where: {gameId: req.params.gameId}}).then((gameplayers) => {
            res.format ({

                html: function() { res.render('./game/gameplayers', {
                    gameId: req.params.gameId,
                    players: players,
                    gameplayers: gameplayers
                }) },
        
                json: function() { res.json(players) }
                
            })

        })
   
    })
})

// POST /games/{id}/players 

router.post('/:gameId/players', (req, res, next) => {
    GamePlayer.destroy({where: {gameId: req.params.gameId}}).then(() => {})
    
    let array = req.body.players
    array.forEach( Id => {
            return GamePlayer.create({ gameId: req.params.gameId, playerId: Id }).then((gameplayer) => {
            })
        }
    )
    res.format ({
        html: function() {res.redirect(`/games/${req.params.gameId}/players`)},
        json: function() {res.json(204)}
    })
})

// DELETE /games/{id}/players

router.delete('/:gameId/players', (req, res, next) => {
    console.log("je suis lalaaaa")

    GamePlayer.destroy({where: {playerId: req.query.playerId, gameId: req.params.gameId}}).then(() => {
        res.format ({

            html: function() { res.redirect(`/games/${req.params.gameId}/players`) }, 
      
            json: function() { res.json(204) }
            
          })
      
    })
    
})

// POST /games/{id}/shots

router.post('/:gameId/shots', (req, res, next) => {
    Game.findOne({where: {id: req.params.gameId}}).then((game) => {
        GameShot.create({sector: req.body.sector, multiplicator: req.body.multiplicator, gameId: game.id, playerId: game.currentPlayerId}).then((shot) => {
            GamePlayer.findOne({where: {playerId: game.currentPlayerId, gameId: game.id}}).then((gameplayer) => {
                let newremainingshot =  gameplayer.remainingShots - 1 
                GamePlayer.update({remainingShots: newremainingshot },{where: {playerId: game.currentPlayerId}}).then(() => {
                    if (newremainingshot <= 0) {
                        GamePlayer.update({remainingShots: 3 },{where: {playerId: gameplayer.playerId}}).then(() => {
                            GamePlayer.findAll({where: {gameId: game.id}}).then((players) =>{ 
                                let maxrank = 0
                                players.forEach(player => {
                                    if (player.rank > maxrank){
                                        maxrank = player.rank
                                    }

                                })

                                if (gameplayer.rank == maxrank) {
                                    GamePlayer.findOne({where: {rank: 0}}).then((play) => {
                                        Game.update({currentPlayerId: play.playerId},{where: {id: game.id}}).then(() => {})

                                    })
                                }
                                else {
                                    GamePlayer.findOne({where: {rank: gameplayer.rank + 1 }}).then((play) => {
                                        Game.update({currentPlayerId: play.playerId},{where: {id: game.id}}).then(() => {})

                                    })
                                }

                                

                            })
                        })

                    }

                    let shotscore = shot.sector * shot.multiplicator

                    

                    let newscore = gameplayer.score - shotscore
                    console.log(" ")
                    console.log("newscore", newscore, "lastscore :" ,gameplayer.score)
                    console.log(" ")
                    switch (game.mode) {
                        case "Around the world":

                            console.log("around the world")
                        case "301":

                            
                            if (shot.multiplicator == 2 && newscore == 0){
                                GamePlayer.update({score: newscore },{where: {playerId: game.currentPlayerId}}).then(() => {  })
                                Game.update({status: "ended"},{where: {id: game.id}}).then(() => {  })
                               
                            }

                            else if (newscore > 1) {
                                
                                
                                GamePlayer.update({score: newscore },{where: {playerId: game.currentPlayerId}}).then(() => {  })
                              
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
            })
        })
    })
})


// DELETE /games/{id}/shots/previous

router.delete('/:gameId/shots/previous', (req, res, next) => {
    GameShot.delete({})
    res.format ({

      html: function() { res.render('./main') },

      json: function() { res.json("406 NOT_API_AVAILABLE") }
      
    })

})

// GET /*

router.get('/jbad', (req, res, next) => {
    res.format ({

      html: function() { res.render('./main') },

      json: function() { res.json("406 NOT_API_AVAILABLE") }
      
    })

})

module.exports = router
