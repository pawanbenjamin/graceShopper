const router = require('express').Router()

const { Order } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.getAllOrders()
    res.send(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.getOrderById(req.params.id)
    res.send(order)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id/purchase', async (req, res, next) => {
  try {
    const purchasedOrder = await Order.purchaseCart(req.params.id)
    res.send(purchasedOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
