const Creds = require('../models/creds')
const Student = require('../models/student')

exports.claim = async (req, res, next) => {
  const credsId = req.params.credsId

  try {
    const creds = await Creds.findById(credsId)
    if (!creds) {
      const error = new Error('Creds not found')
      error.statusCode = 404
      throw error
    }

    const student = await Student.findById(req.studentId)

    if (!student) {
      const error = new Error('Student not found')
      error.statusCode = 404
      throw error
    }

    if (creds.claimedBy.indexOf(student._id) !== -1) {
      const error = new Error('Creds already claimed')
      error.statusCode = 402
      throw error
    }

    creds.claimedBy.push(student._id)

    student.creds.push({
      key: creds._id,
      points: creds.points,
      title: creds.title,
      description: creds.description,
      timestamp: creds.timestamp,
    })

    student.totalCreds += creds.points

    await student.save()
    await creds.save()

    res.status(200).json({ message: 'Creds claimed!', student, creds })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
