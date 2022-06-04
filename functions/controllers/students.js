const { validationResult } = require('express-validator')
const brcypt = require('bcryptjs')

const Student = require('../models/student')
exports.getStudent = async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber.toUpperCase() // get registration number from url and convert to uppercase

  try {
    const student = await Student.findOne({ registrationNumber })

    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({ message: 'Student fetched!', student })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getStudentPublic = async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber.toUpperCase() // get registration number from url and convert to uppercase

  try {
    const student = await Student.findOne({ registrationNumber }).select(
      '-mobileNumber'
    )

    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({ message: 'Student fetched!', student })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
exports.updateStudent = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
    return next(error)
  }

  const registrationNumber = req.params.registrationNumber.toUpperCase() // get registration number from url and convert to uppercase
  const name = req.body.name
  const mobileNumber = req.body.mobileNumber
  let password = req.body.password

  try {
    const student = await Student.findOne({ registrationNumber })

    if (!student) {
      const error = new Error(
        'Could not find student with registration number: ' + registrationNumber
      )
      error.statusCode = 404
      throw error
    }

    student.name = name
    student.mobileNumber = mobileNumber
    if (password) {
      const hashedPassword = await brcypt.hash(password, 12)
      student.password = hashedPassword
    }

    const result = await student.save()
    res.status(200).json({ message: 'Student updated!', studentId: result._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteStudent = async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber.toUpperCase()

  try {
    const student = await Student.findOneAndDelete({ registrationNumber })

    if (!student) {
      const error = new Error('Could not find student.')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({ message: 'Student deleted!' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.addCreds = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
    return next(error)
  }

  const registrationNumber = req.params.registrationNumber.toUpperCase() // get registration number from url and convert to uppercase
  const points = req.body.points
  const title = req.body.title
  const description = req.body.description
  const timestamp = Date.now()

  try {
    const student = await Student.findOne({ registrationNumber })

    if (!student) {
      const error = new Error(
        'Could not find student with registration number: ' + registrationNumber
      )
      error.statusCode = 404
      throw error
    }

    student.creds.push({
      points,
      title,
      description,
      timestamp,
      key: timestamp,
    })

    student.totalCreds += points

    const result = await student.save()
    res.status(200).json({ message: 'Student updated!', studentId: result._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteCreds = async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber.toUpperCase() // get registration number from url and convert to uppercase
  const key = req.params.key
  try {
    const student = await Student.findOne({ registrationNumber })

    if (!student) {
      const error = new Error(
        'Could not find student with registration number: ' + registrationNumber
      )
      error.statusCode = 404
      throw error
    }
    let points
    const creds = student.creds.filter(cred => {
      if (cred.key === key) {
        points = cred.points
      }
      return cred.key !== key
    })
    console.log('typeof points: ', typeof points, points)
    console.log('typeof student total points: ', typeof student.totalCreds)
    student.creds = creds
    student.totalCreds -= points
    await student.save()
    res.status(200).json({ message: 'Student updated!', student })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
