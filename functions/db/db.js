const mongoose = require('mongoose')

require('dotenv').config()
mongoose
  .connect(process.env.MONGODB_URI)
  .then()
  .catch(err => {
    console.log(err)
  })
