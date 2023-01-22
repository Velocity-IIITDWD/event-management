// if the signup cred points are 50, make it 30 and and -20 to the total creds

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

async function updateCreds() {
  const students = await Student.find({})

  for (let i = 0; i < students.length; i++) {
    const student = students[i]

    const creds = student.creds

    creds.forEach(cred => {
      if (cred.title === 'Signup Bonus' && cred.points === 50) {
        cred.points = 30
        cred.description = `Received ${cred.points} Points for signing up.`

        student.totalCreds -= 20
      }
    })

    await student.save()
  }
}

updateCreds()
