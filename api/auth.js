const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter = require('express').Router()
const { User } = require('../db/models')
const { JWT_SECRET } = require('../secrets')
const { authRequired } = require('./utils')
const SALT_ROUNDS = 10

authRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.createUser({ username, password: hashedPassword })

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

    const user = await User.getUserByUsername(username)

    // This is a boolean
    const validPassword = await bcrypt.compare(password, user.password)

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

authRouter.post('/me', authRequired, async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await User.getUserByUsername(username)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

module.exports = authRouter
