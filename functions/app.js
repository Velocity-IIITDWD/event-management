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

const eventRoutes = require('./routes/events')
const studentRoutes = require('./routes/students')
const publicRoutes = require('./routes/public')
const registrationRoutes = require('./routes/registrations')

const errorHandler = require('./middlewares/errorHandler')

app.use('/*events', eventRoutes)
app.use('/*students', studentRoutes)
app.use('/*public', publicRoutes)
app.use('/*registrations', registrationRoutes)

// 404 handler
app.use(errorHandler.get404)

// global error handler
app.use(errorHandler.global)

exports.handler = serverless(app)
