const Feedback = require('../models/feedback')
const Event = require('../models/event')
const Student = require('../models/student')

exports.getFeedbacks = async (req, res, next) => {
  const eventId = req.params.eventId

  try {
    const fbs = await Feedback.find({ event: eventId })

    res.status(200).json({ message: 'Feedbacks fetched', feedbacks: fbs })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.createFeedback = async (req, res, next) => {
  const eventId = req.params.eventId
  const studentId = req.studentId

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }

    const student = await Student.findById(studentId)

    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      return next(error)
    }

    const prev_fb = await Feedback.findOne({ event, student: studentId })

    if (prev_fb) {
      return res.status(200).json({ message: 'Feedback already submitted' })
    }

    const fb = new Feedback({
      student: studentId,
      event: eventId,
      general: req.body.general,
      speaker: req.body.speaker,
      content: req.body.content,
      rating: req.body.rating,
    })

    const points = 50
    const timestamp = Date.now()

    student.creds.push({
      points,
      title: 'Feedback Points',
      description: `Received ${points} Points for giving a feedback.`,
      timestamp,
      key: timestamp.toString(),
    })

    student.totalCreds += points

    await student.save()
    const result = await fb.save()
    res.status(201).json({ message: 'Feedback created!', feedback: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
