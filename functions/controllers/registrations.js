const Student = require('../models/student')
const Event = require('../models/event')

exports.registerEvent = async (req, res, next) => {
  const LIMIT_REGISTRATIONS = 120

  const eventId = req.params.eventId
  const studentId = req.studentId

  if (!studentId) {
    const error = new Error('Unauthorized')
    error.statusCode = 403
    return next(error)
  }

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }

    if (event.registrations.length >= LIMIT_REGISTRATIONS) {
      const error = new Error('Registrations for this event are full.')
      error.statusCode = 402
      return next(error)
    }

    if (event.isRegistrationOpen) {
      if (event.registrations.indexOf(studentId) !== -1) {
        const error = new Error('Already registered for this event.')
        error.statusCode = 402
        return next(error)
      }
    } else {
      const error = new Error('Registration for this event is closed.')
      error.statusCode = 402
      return next(error)
    }

    event.registrations.push(studentId)
    try {
      const student = await Student.findById(studentId)

      if (!student) {
        const error = new Error('Could not find student')
        error.statusCode = 404
        throw error
      }

      student.creds.push({
        points: event.registrationPoints,
        title: `Registered for Event - ${event.title}`,
        description: `Received ${event.registrationPoints} Points for registering in the event - ${event.title}`,
        timestamp: Date.now(),
        key: event._id,
      })

      student.totalCreds += event.registrationPoints

      await student.save()
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
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

exports.isRegistered = async (req, res, next) => {
  const eventId = req.params.eventId
  const studentId = req.studentId

  if (!studentId) {
    const error = new Error('Unauthorized')
    error.statusCode = 403
    return next(error)
  }

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }

    let isRegistered = false
    if (event.registrations.indexOf(studentId) !== -1) {
      isRegistered = true
    }

    await event.save()
    res.status(201).json({ message: 'Status Fetched', isRegistered })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.isRegistrationFull = async (req, res, next) => {
  const eventId = req.params.eventId

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }
    const isRegistrationFull = event.registrations.length >= 120
    await event.save()
    res.status(201).json({ message: 'Status Fetched', isRegistrationFull })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getRemainingRegistrations = async (req, res, next) => {
  const eventId = req.params.eventId

  try {
    const event = await Event.findById(eventId)
    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }
    const remainingRegistrations = 120 - event.registrations.length
    await event.save()
    res.status(201).json({ message: 'Status Fetched', remainingRegistrations })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.registrations = async (req, res, next) => {
  const eventId = req.params.eventId

  try {
    const event = await Event.findById(eventId).populate('registrations')

    if (!event) {
      const error = new Error('Could not find event.')
      error.statusCode = 404
      return next(error)
    }
    res.status(200).json({
      message: 'Registrations Fetched',
      registrations: event.registrations,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
