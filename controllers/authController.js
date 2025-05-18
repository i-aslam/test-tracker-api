const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// register new user
// route: post /api/auth/register
exports.register = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body

  // check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' })
  }

  // check if email is already registered
  const exists = await User.findOne({ email })
  if (exists) {
    return res.status(400).json({ message: 'Email already in use' })
  }

  // generate salt for hashing password
  const salt = await bcrypt.genSalt(10)

  // hash password before saving
  const hashed = await bcrypt.hash(password, salt)

  // create a new user record
  const user = await User.create({
    name,
    email,
    password: hashed
  })

  // sign a jwt token for this user
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )

  // respond with the token
  res.status(201).json({ token })

})

// login existing user
// route: post /api/auth/login
exports.login = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  // find user by email address
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  // compare entered password with stored hash
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  // generate new jwt token for user
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )

  // send back the token
  res.json({ token })

})
