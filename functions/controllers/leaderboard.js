const Student = require('../models/student')

require('dotenv').config()

exports.getLeaderBoard = async (req, res, next) => {
  const page = req.query.page || 1
  const perPage = process.env.PER_PAGE_STUDENTS

  try {
    const totalStudents = await Student.find({
      type: 'student',
    }).countDocuments() // count documents

    const students = await Student.find({
      type: 'student',
    })
      .sort({ totalCreds: -1, createdAt: -1 })

      .skip((page - 1) * perPage)
      .limit(perPage)
      .select('-mobileNumber')

    res.status(200).json({
      message: 'Students fetched!',
      students,
      pages: Math.ceil(totalStudents / perPage),
      currentPage: page,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.reEvaluate = async (req, res, next) => {
  const registrationNumber = req.params.registrationNumber

  try {
    const student = await Student.findOne({
      registrationNumber,
    })

    if (!student) {
      const error = new Error('Student not found')
      error.statusCode = 404
      throw error
    }

    let creds = 0
    let prevCreds = student.totalCreds

    student.creds.forEach(cred => {
      creds += cred.points
    })

    student.totalCreds = creds

    await student.save()

    res.status(200).json({
      message: 'Student re-evaluated!',
      student,
      prevCreds,
      currCreds: creds,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
