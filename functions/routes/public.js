const express = require('express')
const router = express.Router()

require('../db/db')

const studentController = require('../controllers/students')
const eventController = require('../controllers/events')
const leaderboardController = require('../controllers/leaderboard')

router.get('/student/:registrationNumber', studentController.getStudentPublic)
router.get('/events', eventController.getEvents)
router.get('/events/:eventId', eventController.getEvent)
router.get('/leaderboard', leaderboardController.getLeaderBoard)
router.get('/re-evaluate/:registrationNumber', leaderboardController.reEvaluate)

module.exports = router
