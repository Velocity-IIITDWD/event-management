const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
    general: {
      type: String,
      required: true,
    },
    speaker: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = Feedback
