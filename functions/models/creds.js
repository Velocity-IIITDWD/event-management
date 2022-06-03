const mongoose = require('mongoose')
const Schema = mongoose.Schema

const credsSchema = new Schema(
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
    claimedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Creds', credsSchema)
