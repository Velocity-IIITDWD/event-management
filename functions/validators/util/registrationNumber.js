const { body } = require('express-validator')

module.exports = body('registrationNumber')
  .isAlphanumeric()
  .isLength({ min: 8, max: 8 })
  .withMessage('Registration number must be 8 characters long')
  .trim()
