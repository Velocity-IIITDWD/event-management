const express = require('express')
const router = express.Router()

const credController = require('../controllers/creds')

router.get('/', credController.getCreds)
router.post('/add', credController.addCreds)
router.delete('/:credsId', credController.deleteCreds)

module.exports = router
