const router = require('express').Router()
const Player = require("../models/player.js")




// GET /players


router.get('/players', (req, res, next) => {
    
  Player.findAll().then((players) => {
      let limit = parseInt(req.query.limit) || 10
      let page = parseInt(req.query.page)
      let sort = req.query.sort
      let reverse = req.query.reverse


      res.format ({

          html: function() { res.render('./player/main', {
              players: players, 
              limit: limit,
              page: page, 
              sort: sort,
              reverse: reverse, 
          })},

          json: function() { res.json(Player) } 
          
          })
      })  


  .catch((err) => {
      next(new Error(err))
  })
})



// POST /players
router.post('/players', (req, res, next) => {
  Player.create({name: req.query.name, email: req.query.email}).then(() => {
    res.format ({

      html: res.redirect('/players'),

      json: res.json(201)
      
    })
  })
    

})

// GET /players/new

router.get('/players/new', (req, res, next) => {
    res.format ({

      html: res.render('./player/new'),

      json: res.json("406 NOT_API_AVAILABLE")
      
    })

})

// GET /players/{id}

router.get('/players/playerId', (req, res, next) => {
  Player.findOne({where: {id: req.params.playerId}}).then((player) => {
    res.format ({

      html: res.render('./player/show', {
        player: player
      }),

      json: res.json(player)
      
    })
  })
 

})

//GET /players/{id}/edit

router.get('/players/playerId', (req, res, next) => {
  Player.findOne({where: {id: req.params.playerId}}).then((player) => {

    res.format ({

      html: res.render('./player/edit', {
        player: player
      }),

      json: res.json("406 NOT_API_AVAILABLE")
      
    })
  })

})


// PATCH /players/{id}


router.patch('/players/playerId', (req, res, next) => {
  Player.findOne({where: {id: req.params.playerId}}).then((player) => {
    player.update({name: req.query.name, email: req.query.email}).then((play) => {
      res.format ({

        html: res.redirect('/players', {
          play: play
        }),
  
        json: res.json(200, play)
        
      })
    })
  })
})

// DELETE /players/{id}

router.delete('/players/{id}', (req, res, next) => {
  Player.delete({where: {id: req.params.playerId}}).then(() => {
    res.format ({

      html: res.redirect('/players'),

      json: res.json("406 NOT_API_AVAILABLE")
      
    })
  })
})

module.exports = router