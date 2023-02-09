const { validationResult } = require('express-validator')

const Event = require('../models/event')
const Student = require('../models/student')

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
    res.status(200).json({ message: 'Events fetched!', events })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getEvent = async (req, res, next) => {
  const eventId = req.params.eventId
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Event not found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({ message: 'Event fetched!', event })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.createEvent = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
    return next(error)
  }

  const title = req.body.title
  const description = req.body.description
  const imgUrl = req.body.imgUrl
  const registrationPoints = req.body.registrationPoints
  const isRegistrationOpen = req.body.isRegistrationOpen
  const maxRegistrations = req.body.maxRegistrations

  const event = new Event({
    title,
    description,
    imgUrl,
    registrationPoints,
    isRegistrationOpen,
    maxRegistrations,
  })

  try {
    const result = await event.save()
    res.status(201).json({ message: 'Event created!', event: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.updateEvent = async (req, res, next) => {
  const eventId = req.params.eventId

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
  }

  const title = req.body.title
  const description = req.body.description
  const imgUrl = req.body.imgUrl
  const registrationPoints = req.body.registrationPoints
  const isRegistrationOpen = req.body.isRegistrationOpen
  const maxRegistrations = req.body.maxRegistrations

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }

    event.title = title
    event.description = description
    event.imgUrl = imgUrl
    event.registrationPoints = registrationPoints
    event.isRegistrationOpen = isRegistrationOpen
    event.maxRegistrations = maxRegistrations

    const result = await event.save()
    res.status(201).json({ message: 'Event updated!', event: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteEvent = async (req, res, next) => {
  const eventId = req.params.eventId
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }
    await event.remove()
    res.status(200).json({ message: 'Event deleted!' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.removeRegistration = async (req, res, next) => {
  const eventId = req.params.eventId
  const registrationNumber = req.params.registrationNumber.toUpperCase()

  if (!registrationNumber) {
    const error = new Error('Registration Number required')
    error.statusCode = 402
    return next(error)
  }

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }

    const student = await Student.findOne({ registrationNumber })

    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      return next(error)
    }

    const studentId = student._id

    if (event.isRegistrationOpen) {
      if (event.registrations.indexOf(studentId) !== -1) {
        const newRegistrations = event.registrations.filter(
          stuId => stuId.toString() !== studentId.toString()
        )
        event.registrations = newRegistrations
        try {
          const student = await Student.findById(studentId)

          if (!student) {
            const error = new Error('Could not find student')
            error.statusCode = 404
            throw error
          }

          const creds = student.creds.filter(
            cred => cred.key.toString() !== event._id.toString()
          )
          student.creds = creds
          student.totalCreds -= event.registrationPoints

          const result = await student.save()
          res
            .status(200)
            .json({ message: 'Student updated!', studentId: result._id })
        } catch (err) {
          if (!err.statusCode) {
            err.statusCode = 500
          }
          next(err)
        }
      }
    }

    const result = await event.save()
    res.status(201).json({ message: 'Event updated!', event: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
