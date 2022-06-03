const jwt = require('jsonwebtoken')

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

    req.studentId = decodedToken.studentId
    req.registrationNumber = decodedToken.registrationNumber
    // this is used to access the adminId in the next middleware [we are not using the adminId anywhere though]
    next()
  } catch (err) {
    err.statusCode = 401
    next(err)
  }
}
