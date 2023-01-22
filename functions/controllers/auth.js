const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Student = require('../models/student')

exports.signup = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    error.data = errors.array()
    return next(error)
  }

  const name = req.body.name
  const registrationNumber = req.body.registrationNumber.toUpperCase()
  const mobileNumber = req.body.mobileNumber
  const password = req.body.password

  try {
    const isStudent = await Student.findOne({ registrationNumber })

    if (isStudent) {
      const error = new Error('Student already exists.')
      error.statusCode = 401
      throw error
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const student = new Student({
      name,
      registrationNumber,
      password: hashedPassword,
      mobileNumber,
    })

    // await student.save()

    // const registeredStudents = await Student.find({
    //   type: 'student',
    // }).countDocuments()
    // const signedupStudent = await Student.findOne({ registrationNumber })

    // const points = Math.ceil(
    //   (50 * (process.env.TOTAL_STUDENTS - registeredStudents)) /
    //     process.env.TOTAL_STUDENTS
    // )

    const timestamp = Date.now()
    const points = 30

    student.creds.push({
      points,
      title: 'Signup Bonus',
      description: `Received ${points} Points for signing up.`,
      timestamp,
      key: timestamp.toString(),
    })

    student.totalCreds += points

    await student.save()

    res.status(201).json({ message: 'Student created!', student })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.login = async (req, res, next) => {
  const registrationNumber = req.body.registrationNumber.toUpperCase()
  const password = req.body.password

  try {
    const student = await Student.findOne({ registrationNumber }).select(
      '+password'
    )

    if (!student) {
      const error = new Error('Invalid registration number.')
      error.statusCode = 401
      throw error
    }
    const isEqual = await bcrypt.compare(password.toString(), student.password)

    if (!isEqual) {
      const error = new Error('Invalid password.')
      error.statusCode = 401
      throw error
    }

    const token = jwt.sign(
      {
        registrationNumber: student.registrationNumber,
        studentId: student._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      message: 'Logged in!',
      token: token,
      studentId: student._id.toString(),
      type: student.type,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
