const router = require('express').Router()
const {User, Hub, Node} = require('../db/models')
module.exports = router

//GET /api/hubs
//Get all of the user's hubs
router.get('/', async (req, res, next) => {
  try {
    let hubs
    //If a visitor is logged in
    if (req.user) {
      //get that user's hubs
      hubs = await Hub.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            model: Node
          },
          {
            model: User
          }
        ]
      })
    } else {
      //Visitor is not logged in
      //Check and see if they have a hub
      if (req.session.hasHub) {
        console.log('check and see if they have hub')
        hubs = await Hub.findAll({
          where: {
            id: req.session.guestHubId
          }
        })
      }
      if (!req.session.hasHub) {
        console.log('test')
        //if they don't have a hub, make them one
        const guestHub = await Hub.create({
          name: 'Guest Hub',
          isPrivate: false
        })
        req.session.hasHub = true
        req.session.guestHubId = guestHub.id
        hubs = guestHub
      }
    }
    res.send(hubs)
  } catch (err) {
    next(err)
  }
})

// GET /api/hubs/:hubId
//get a specific hub
router.get('/:hubId', async (req, res, next) => {
  try {
    const hub = await Hub.findOne({
      where: {
        id: req.params.hubId
      },
      include: [
        {
          model: Node
        },
        {
          model: User
        }
      ]
    })
    if (!hub) {
      res.status(404).send(`This hub doesn't exist`)
    }
    //if the hub is set to private
    if (hub.isPrivate) {
      //check and see if visitor is logged in
      if (req.user) {
        //if logged in, check to see hub requested doesn't belong to visitor
        if (req.user.id !== hub.userId) {
          res.status(401).send('You are not authorized to view this hub')
        }
      }
    }

    res.send(hub)
  } catch (error) {
    next(error)
  }
})

// POST /api/hubs
router.post('/', async (req, res, next) => {
  try {
    const newHub = await Hub.create(req.body)
    res.send(newHub)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/hubs/:hubId
router.delete('/:hubId', async (req, res, next) => {
  try {
    const hub = await Hub.findByPk(req.params.hubId)
    if (!hub) {
      res.send(`This hub doesn't exist`)
    }
    await hub.destroy()
    res.status(204).send('Successfully deleted!')
  } catch (error) {
    next(error)
  }
})

// PUT /api/hubs/:hubId
router.put('/:hubId', async (req, res, next) => {
  try {
    const hub = await Hub.findByPk(req.params.hubId)
    if (!hub) {
      res.send(`This hub doesn't exist`)
    }
    const updatedHub = await hub.update(req.body)
    res.status(201).send(updatedHub)
  } catch (error) {
    next(error)
  }
})
