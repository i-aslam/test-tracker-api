const mongoose = require('mongoose')  

const examSchema = new mongoose.Schema({

  // user id reference for this exam
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // name of the course or subject
  course: {
    type: String,
    required: true
  },

  // date of the exam
  date: {
    type: Date,
    required: true
  },

  // time of the exam as text
  time: {
    type: String,
    required: true
  },

  // location where exam will take place
  location: {
    type: String,
    required: true
  },

  // how much this exam counts toward final grade
  percentageWorth: {
    type: Number,
    required: true
  },

  // optional field for storing the result
  result: {
    type: String
  }

}, {
  timestamps: true  // auto create createdAt and updatedAt
})

module.exports = mongoose.model('Exam', examSchema)
