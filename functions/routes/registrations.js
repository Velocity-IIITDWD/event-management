const express = require('express')
const router = express.Router()

require('../db/db')

const registrationController = require('../controllers/registrations')

router.get('/:eventId', registrationController.registerEvent)
router.get('/', registrationController.registrations)
router.get('/verify', registrationController.isRegistered)

module.exports = router
