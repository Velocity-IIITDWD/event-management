const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')
const authValidator = require('../validators/auth')

router.post('/signup', authValidator.signup, authController.signup)
router.post('/login', authValidator.login, authController.login)

module.exports = router
