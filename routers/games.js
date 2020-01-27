const db = require('mysql');
const router = require('express').Router()
const Game = require("../models/game.js")

//GET /
router.get('/', (req, res, next) => {
    res.format ({

        html: function(){ res.redirect('/games') },
        
        json: function() {  res.json("406 NOT_API_AVAILABLE") }
        
    })
})

// GET /games

router.get('/games', (req, res, next) => {
    
    Game.findAll().then((Game) => {
        let limit = parseInt(req.query.limit) || 10
        let page = parseInt(req.query.page)
        let sort = req.query.sort
        let reverse = req.query.reverse
        let fstatus = req.query['f.status']

        console.log("get /games " , Game.name);

        res.format ({

            html: function() { res.render('./game/main', {
                test: Game, 
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

router.get('/games/new', (req, res, next) => {
    res.format ({

      html: function() { res.render('./game/new') },

      json: function() { res.json("406 NOT_API_AVAILABLE") }
      
    })

})

// POST /games

router.post('/games', (req, res, next) => {
    Game.create({name: req.query.name, mode: req.query.mode}).then((game) => {
        res.format ({

            html: function() { res.redirect(`./games/${req.params.id}`)},

            json: function() { res.json(201)}
        
        })
    })

})

// GET /games/{id}

router.get('/games/:gameId', (req, res, next) => {
    Game.findOne({where: {id: req.params.gameId}}).then((Game) => {

        res.format ({

            html: function() { res.render('./game/show', {
                Game: Game
            })},
      
            json: function() { res.json(Game) }
            
          })
    })
    

})

// GET /games/{id}/edit

router.get('/games/:gameId/edit', (req, res, next) => {
    Game.findOne({where: {id: req.params.gameId}}).then((Game) => {
        res.format ({

        html: function() { res.render('./game/edit', {
            Game: Game
        }) },

        json: function() { res.json("406 NOT_API_AVAILABLE") }
        
        })
    })
})

// PATCH /games/{id}

router.patch('/games/{id}', (req, res, next) => {
    Game.update({name: req.params.name, mode: req.params.mode, status: req.params.status }).then(() => {
        res.format ({

        html: function() { res.render('./main') },

        json: function() { res.json(200) }
        
        })
    })

})

// DELETE /games/{id}

router.delete('/games/:gameId', (req, res, next) => {
    Game.destroy({where: {id: req.params.gameId}}).then(() => {
        res.format ({

            html: function() { res.redirect('/games') },
      
            json: function() { res.json(204) }
            
        })

    })  
    

})

// GET /games/{id}/players

router.get('/games/:gameId/players', (req, res, next) => {
    GamePlayer.findAll({where: {gameId: req.params.gameId}}).then((players) => {
        res.format ({

            html: function() { res.render('./gameplayer', {
                players: players
            }) },
      
            json: function() { res.json(players) }
            
          })

    })
   

})

// POST /games/{id}/players 

router.post('/games/:gameId/players ', (req, res, next) => {
    GamePlayer.findOne({where: {id: req.params.gameId}}).then((gameplayer) => {
        gameplayer.concat(req.query.playerId)
        res.format ({

            html: function() { res.redirect(`/games/#{req.params.gameId}/players`)},
      
            json: function() { res.json(gameplayer.playerId)}
            
        })
    })
})

// DELETE /games/{id}/players

router.delete('/games/:gameId/players', (req, res, next) => {
    GamePlayer.delete({where: {id: req.params.gameId}}).then(() => {

        res.format ({

            html: function() { res.redirect(`/games/#{req.params.gameId/players`) }, 
      
            json: function() { res.json("406 NOT_API_AVAILABLE") }
            
          })
      
    })

})

// POST /games/{id}/shots

router.post('/games/:gameId/shots', (req, res, next) => {
    Shot.create({sector: req.query.sector, multiplicator: req.query.multiplicator}).then(() => {
        res.format ({

            html: function() { res.redirect(`/games/req.params.gameId`) },
      
            json: function() { res.json(204) }
            
          })
    })
})

// DELETE /games/{id}/shots/previous

router.delete('/games/:gameId/shots/previous', (req, res, next) => {
    Shot.delete({})
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
