const express = require('express')
const router = express.Router()

require('../db/db')

const studentController = require('../controllers/students')
const studentValidator = require('../validators/students')

router.get('/:registrationNumber', studentController.getStudent)

router.post('/add', studentValidator.addStudent, studentController.addStudent)
router.put(
  '/:registrationNumber',
  studentValidator.updateStudent,
  studentController.updateStudent
) // validation logic is same as addStudent

router.delete('/:registrationNumber', studentController.deleteStudent)

router.post(
  '/creds/:registrationNumber',
  studentValidator.addCreds,
  studentController.addCreds
)
router.delete('/creds/:registrationNumber/:key', studentController.deleteCreds)

module.exports = router
