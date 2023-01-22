const mongoose = require('mongoose')

require('dotenv').config()

const uri =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI

console.log(process.env.NODE_ENV === 'production' ? 'IN PROD' : 'IN DEV')

mongoose
  .connect(uri)
  .then()
  .catch(err => {
    console.log(err)
  })
