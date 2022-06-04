const express = require('express')
const router = express.Router()

require('../db/db')

const registrationController = require('../controllers/registrations')

router.get('/:eventId', registrationController.registerEvent)
router.get('/view/:eventId', registrationController.registrations)
router.get('/verify/:eventId', registrationController.isRegistered)

module.exports = router
