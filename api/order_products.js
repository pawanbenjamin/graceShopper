const router = require('express').Router()
const { Order_Product } = require('../db/models')

router.post('/:orderId/:productId', async (req, res, next) => {
  try {
    const order_product = await Order_Product.addToCart(req.params) // productId, orderId
    res.send(order_product)
  } catch (error) {
    next(error)
  }
})

router.patch('/:orderId/:productId/:qty', async (req, res, next) => {
  console.log(req.body)
  try {
    const updated_op = await Order_Product.updateQtyInCart(req.params) // productId, orderId, qty
    res.send(updated_op)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId/:productId', async (req, res, next) => {
  console.log('hello')
  try {
    const deletedOrderProduct = await Order_Product.removeFromCart(req.params) // productId, orderId
    res.send(deletedOrderProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
