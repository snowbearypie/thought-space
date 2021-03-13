const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/hubs', require('./hubs'))
router.use('/nodes', require('./nodes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
