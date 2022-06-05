const { body } = require('express-validator')

exports.createEvent = [
  // title validation
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
    .isLength({ min: 4 })
    .isLength({ max: 1000 })
    .isAscii()
    .trim(),

  body('registrationPoints').notEmpty().isNumeric(),
  body('imgUrl').notEmpty(),

  body('isRegistrationOpen').isBoolean(),
]
