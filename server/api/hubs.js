const router = require('express').Router()
const {User, Hub, Node} = require('../db/models')
module.exports = router

//GET /api/hubs
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
        console.log(hubs)
      }
      if (!req.session.hasHub) {
        console.log('test')
        //if they don't have a hub, make them one
        const guestHub = await Hub.create({
          name: 'Guest Hub'
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
