const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter = require('express').Router()
const { User, Order } = require('../db/models')
const { JWT_SECRET } = require('../secrets')
const { authRequired } = require('./utils')
const SALT_ROUNDS = 10

authRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.createUser({ username, password: hashedPassword })
    // We could send the cart back here as well eventually
    const cart = await Order.createCartByUserId(user.id)

    delete user.password

    const token = jwt.sign(user, JWT_SECRET)

    res.cookie('token', token, {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
    })

    delete user.password

    res.send({ user })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    console.log('REQ BODY', req.body)
    const user = await User.getUserByUsername(username)
    console.log('user', user)
    // This is a boolean
    const validPassword = await bcrypt.compare(password, user.password)
    console.log('valid password?', validPassword)
    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET)

      res.cookie('token', token, {
        sameSite: 'strict',
        httpOnly: true,
        signed: true,
      })

      delete user.password

      res.send({ user })
    }
  } catch (error) {
    next(error)
  }
})

authRouter.get('/logout', async (req, res, next) => {
  try {
    res.clearCookie('token', {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
    })
    res.send({
      loggedIn: false,
      message: 'Logged Out',
    })
  } catch (error) {
    next(error)
  }
})

authRouter.get('/me', authRequired, async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

module.exports = authRouter
