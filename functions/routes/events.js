const express = require('express')
const router = express.Router()

require('../db/db')

const eventController = require('../controllers/events')
const eventValidation = require('../validators/events')

router.get('/', eventController.getEvents)
router.get('/:eventId', eventController.getEvent)
router.post('/new', eventValidation.createEvent, eventController.createEvent)
router.put(
  '/:eventId',
  eventValidation.createEvent,
  eventController.updateEvent
)
router.delete('/:eventId', eventController.deleteEvent)
router.delete(
  '/:eventId/:registrationNumber',
  eventController.removeRegistration
)

module.exports = router
