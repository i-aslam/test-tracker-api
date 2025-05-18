const asyncHandler = require('express-async-handler')
const Exam = require('../models/Exam')

// create exam
// route: post /api/exams
exports.createExam = asyncHandler(async (req, res) => {

  // create a new exam linked to the current user
  const exam = await Exam.create({ ...req.body, user: req.user._id })

  // respond with the newly created exam
  res.status(201).json(exam)

})

// get all exams for user
// route: get /api/exams
exports.getExams = asyncHandler(async (req, res) => {

  // find all exams for the logged in user
  const exams = await Exam.find({ user: req.user._id })

  // send back the exams array
  res.json(exams)

})

// get single exam by id
// route: get /api/exams/:id
exports.getExamById = asyncHandler(async (req, res) => {

  // find the exam matching id and user
  const exam = await Exam.findOne({ _id: req.params.id, user: req.user._id })

  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' })
  }

  res.json(exam)

})

// update exam
// route: patch /api/exams/:id
exports.updateExam = asyncHandler(async (req, res) => {

  // check if exam exists for this user
  let exam = await Exam.findOne({ _id: req.params.id, user: req.user._id })

  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' })
  }

  // update the exam and return updated document
  exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.json(exam)

})

// delete exam
// route: delete /api/exams/:id
exports.deleteExam = asyncHandler(async (req, res) => {

  // find the exam to remove
  const exam = await Exam.findOne({ _id: req.params.id, user: req.user._id })

  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' })
  }

  // remove the exam document
  await exam.remove()

  res.json({ message: 'Exam removed' })

})
