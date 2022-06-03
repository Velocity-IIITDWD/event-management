const express = require('express')
const router = express.Router()

const claimRoutes = require('./routes/claim')

router.get('/:credsId', claimRoutes.claim)

module.exports = router
