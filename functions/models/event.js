const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    registrationPoints: {
      type: Number,
      required: true,
    },
    isRegistrationOpen: {
      type: Boolean,
      required: true,
      default: true,
    },
    isHidden: {
      type: Boolean,
      required: true,
      default: false,
    },
    maxRegistrations: {
      type: Number,
    },
    registrations: [
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

module.exports = mongoose.model('Event', eventSchema)
