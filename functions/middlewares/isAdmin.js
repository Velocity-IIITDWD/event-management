const jwt = require('jsonwebtoken')

const Student = require('../models/student')

require('dotenv').config()

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    return next(error)
  }

  const token = authHeader.split(' ')[1]
  let decodedToken

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken) {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }

    const student = await Student.findById(decodedToken.studentId)

    if (student.type !== 'admin') {
      const error = new Error('Not authenticated.')
      error.statusCode = 401
      throw error
    }

    next()
  } catch (err) {
    err.statusCode = 401
    next(err)
  }
}
