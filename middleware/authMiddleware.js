const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// middleware to protect private routes
const protect = asyncHandler(async (req, res, next) => {

  // get token from authorization header
  let token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'not authorized' })
  }

  try {
    // verify jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // fetch user and attach to request without password
    req.user = await User.findById(decoded.id).select('-password')

    next()

  } catch (err) {
    res.status(401).json({ message: 'token invalid' })
  }

})

module.exports = { protect }
