const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

require('./db/db')

// allow cross origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

const isAuth = require('./middlewares/isAuth')
const isAdmin = require('./middlewares/isAdmin')

const eventRoutes = require('./routes/events')
const studentRoutes = require('./routes/students')
const publicRoutes = require('./routes/public')
const registrationRoutes = require('./routes/registrations')
const authRoutes = require('./routes/auth')
const credsRoutes = require('./routes/creds')
const qrcodeRoutes = require('./routes/qrcode')

const errorHandler = require('./middlewares/errorHandler')

app.use('/*public', publicRoutes)
app.use('/*auth', authRoutes)

app.use('/*registrations', isAuth, registrationRoutes)
app.use('/*qrcodes', isAuth, qrcodeRoutes)

app.use('/*creds/', isAdmin, credsRoutes)
app.use('/*events', isAdmin, eventRoutes)
app.use('/*students', isAdmin, studentRoutes)

// 404 handler
app.use(errorHandler.get404)

// global error handler
app.use(errorHandler.global)

exports.handler = serverless(app)
