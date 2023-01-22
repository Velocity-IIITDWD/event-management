const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const uri =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI

mongoose
  .connect(uri)
  .then()
  .catch(err => {
    console.log(err)
  })

const Student = require('../models/student')

const limiting_timestamp = 1674063443716 // 18 jan 2023

const updateStudent = async student => {
  let totalCreds = 0

  student.creds.forEach(cred => {
    if (cred.timestamp > limiting_timestamp) totalCreds += cred.points
  })

  student.totalCreds = totalCreds

  await student.save()
}

const updateStudents = async () => {
  const students = await Student.find({})

  for (let i = 0; i < students.length; i++) {
    await updateStudent(students[i])
  }
}

updateStudents()
  .then(() => {
    console.log('done')
    process.exit()
  })
  .catch(err => {
    console.log(err)
    process.exit()
  })
