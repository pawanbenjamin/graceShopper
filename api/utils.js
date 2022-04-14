const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

const authRequired = async (req, res, next) => {
  const token = req.signedCookies.token
  console.log('Cookie Token:', token)
  try {
    const user = await jwt.verify(token, JWT_SECRET)
    req.user = user
    console.log('Req.user:', req.user)
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: 'You are def not authorized.',
    })
    return
  }
  next()
}

module.exports = { authRequired }
