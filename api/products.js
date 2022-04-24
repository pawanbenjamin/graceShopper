const router = require('express').Router()

const { Product } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.getAllProducts()
    res.send(allProducts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.getProductById(req.params.id)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
