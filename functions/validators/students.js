const { body } = require('express-validator')

const registrationNumber = require('./util/registrationNumber.js')

exports.addStudent = [
  // name validation
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
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .isLength({ max: 30 })
    .withMessage('Password must be at most 30 characters long')
    .trim(),

  body('mobileNumber').isLength({ min: 10, max: 13 }).trim(),
]

exports.updateStudent = [
  // name validation
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 30 })
    .withMessage('Name must be at most 30 characters long')
    .isString()
    .withMessage('Name must be alphabetic')
    .trim(),

  // password validation
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .isLength({ max: 30 })
    .withMessage('Password must be at most 30 characters long')
    .trim(),

  body('mobileNumber').isLength({ min: 10, max: 13 }).trim(),
]

exports.addCreds = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters long')
    .isAscii()
    .withMessage('Title must be ascii characters only')
    .trim(),

  // description validation
  body('description')
    .notEmpty()
    .isLength({ min: 10 })
    .isLength({ max: 1000 })
    .isAscii()
    .trim(),

  body('points').notEmpty().isNumeric(),
]
