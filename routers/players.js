const router = require('express').Router()
const Player = require("../models/player.js")

const override = require('method-override');
router.use(override('_override'))



// GET /players


router.get('/', async (req, res, next) => {
    
  const players = await Player.findAll()

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

      json: function() { res.json(players) } 
      
      })
  })  


// POST /players
router.post('/', async (req, res, next) => {
  const player = await Player.create({name: req.body.name, email: req.body.email})
  res.format ({

    html: function() {res.redirect(`/players/${player.id}`)},

    json: function() {res.json(player)}
    
  })
    

})

// GET /players/new

router.get('/new', (req, res, next) => {
    res.format ({

      html: function() {res.render('./player/new')},

      json: function() {res.json("406 NOT_API_AVAILABLE")}
      
    })

})

// GET /players/{id}

router.get('/:playerId', async (req, res, next) => {
  const player = await Player.findOne({where: {id: req.params.playerId}})
  res.format ({

    html: function() {res.redirect(`/players/${player.id}/edit`)},

    json: function() {res.json(player)}
  })
})

//GET /players/{id}/edit

router.get('/:playerId/edit', async (req, res, next) => {
  const player = await Player.findOne({where: {id: req.params.playerId}})

  res.format ({

    html: function() {res.render('./player/edit', {
      player: player
      }
    )},

    json: function() {res.json("406 NOT_API_AVAILABLE")}
  })

})


// PATCH /players/{id}

router.patch('/:playerId', async (req, res, next) => {
    await Player.update({name: req.body.name, email: req.body.email},{where: {id: req.params.playerId}})
    const player = await Player.findOne({where: {id:  req.params.playerId }})

    res.format ({

      html: function() {res.redirect(`/players`)},

      json: function() {res.json(200, player)}
    })
})


// DELETE /players/{id}

router.delete('/:playerId', async (req, res, next) => {
  await Player.destroy({where: {id: req.params.playerId}})
  res.format ({

    html: function() {res.redirect('/players')},

    json: function() { res.json(204)}
  })
})

module.exports = router