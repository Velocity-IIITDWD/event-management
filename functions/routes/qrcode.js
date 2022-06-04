const express = require('express')
const router = express.Router()

const claimController = require('../controllers/claim')

router.get('/:credsId', claimController.claim)

module.exports = router
