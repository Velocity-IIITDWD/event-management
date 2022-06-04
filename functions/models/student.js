const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    creds: [
      {
        points: {
          type: Number,
          required: true,
        },
        timestamp: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        key: {
          type: String,
          default: null,
        },
      },
    ],

    totalCreds: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      default: 'student',
      isRequired: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Student', studentSchema)
