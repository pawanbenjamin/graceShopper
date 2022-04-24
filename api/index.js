const router = require('express').Router()

router.get('/health', (req, res, next) => {
  res.send('API is healthy and ready to go!')
})
router.use('/auth', require('./auth'))

router.use('/users', require('./users'))

router.use('/products', require('./products'))

router.use('/orders', require('./orders'))

router.use('/order_products', require('./order_products'))

module.exports = router
