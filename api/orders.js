const router = require('express').Router()

const { Order } = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.getOrderById(req.params.id)
    res.send(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
