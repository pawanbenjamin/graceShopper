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

module.exports = router
