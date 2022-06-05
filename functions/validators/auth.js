const { body } = require('express-validator')

const registrationNumber = require('./util/registrationNumber.js')

exports.login = [
  registrationNumber,
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 6 characters long')
    .isLength({ max: 30 })
    .withMessage('Password must be at most 30 characters long')
    .trim(),
]

exports.signup = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 30 })
    .withMessage('Name must be at most 30 characters long')
    .isString()
    .withMessage('Name must be alphabetic')
    .trim(),

  // registrationNumber validation
  registrationNumber,

  // password validation
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 6 characters long')
    .isLength({ max: 30 })
    .withMessage('Password must be at most 30 characters long')
    .trim(),

  body('mobileNumber').isLength({ min: 10, max: 13 }).trim(),
]
