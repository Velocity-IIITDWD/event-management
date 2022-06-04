const Student = require('../models/student')

exports.getLeaderBoard = async (req, res, next) => {
  const page = req.query.page || 1
  const perPage = 15

  try {
    const totalStudents = await Student.find({
      type: 'student',
    }).countDocuments() // count documents
    const students = await Student.find({
      type: 'student',
    })
      .sort({ totalCreds: -1 })

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
