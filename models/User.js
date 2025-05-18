const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  // full name of the user
  name: {
    type: String,
    required: true
  },

  // unique email for login
  email: {
    type: String,
    required: true,
    unique: true
  },

  // hashed password for authentication
  password: {
    type: String,
    required: true
  }

}, {
  // auto add createdAt and updatedAt timestamps
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
