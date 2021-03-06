const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

const authRequired = async (req, res, next) => {
  const token = req.signedCookies.token
  try {
    const user = await jwt.verify(token, JWT_SECRET)
    delete user.password
    req.user = user
  } catch (error) {
    res.send({
      loggedIn: false,
      message: 'You are def not authorized.',
    })
    return
  }
  next()
}

module.exports = { authRequired }
