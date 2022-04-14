const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { COOKIE_SECRET } = require('./secrets')

const path = require('path')

const cors = require('cors')

const { authRequired } = require('./api/utils')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use(cookieParser(COOKIE_SECRET))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, './client', 'build')))

app.use('/api', require('./api'))

app.get('/authTest', authRequired, (req, res, next) => {
  res.send('You are authorized')
})

app.use((error, req, res, next) => {
  res.status(500).send(error)
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'))
})

module.exports = app
