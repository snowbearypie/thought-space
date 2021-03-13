const router = require('express').Router()
const {User, Hub, Node} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let nodes
    //If a user is logged in
    if (req.user) {
      //get that user's sub-hubs
      nodes = await Node.findAll({
        where: {
          userId: req.user.id
        }
      })
    } else {
      //Visitor is not logged in
      //Check and see if they have any hubs
      let hubs = await Hub.findOne({
        where: {
          id: req.session.guestHubId
        },
        //send along any Nodes associated with their Hub
        include: Node
      })
      //if they don't have a hub, send an empty array
      if (!hubs) {
        nodes = []
      }
      //send along hub with all Nodes
      nodes = hubs.nodes
    }
    res.send(nodes)
  } catch (err) {
    next(err)
  }
})

// GET /api/nodes/:nodeId
router.get('/:nodeId', async (req, res, next) => {
  try {
    const node = await Node.findOne({
      where: {
        id: req.params.nodeId
      },
      include: [
        {
          model: Hub
        },
        {
          model: User
        }
      ]
    })
    if (!node) {
      res.status(404).send(`This node doesn't exist`)
    }
    res.send(node)
  } catch (error) {
    next(error)
  }
})
