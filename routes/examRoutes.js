const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam
} = require('../controllers/examController');

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: exam management (CRUD)
 */

/**
 * @swagger
 * /api/exams:
 *   get:
 *     summary: Get all exams for the logged-in user
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of exam objects
 */
router.get('/', protect, getExams);

/**
 * @swagger
 * /api/exams:
 *   post:
 *     summary: Create a new exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - course
 *               - date
 *               - location
 *               - time
 *               - percentageWorth
 *             properties:
 *               course:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               time:
 *                 type: string
 *               percentageWorth:
 *                 type: integer
 *               result:
 *                 type: string
 *     responses:
 *       201:
 *         description: Exam created successfully
 */
router.post('/', protect, createExam);

/**
 * @swagger
 * /api/exams/{id}:
 *   get:
 *     summary: Get a single exam by ID
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single exam object
 *       404:
 *         description: Exam not found
 */
router.get('/:id', protect, getExamById);

/**
 * @swagger
 * /api/exams/{id}:
 *   patch:
 *     summary: Update an existing exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               time:
 *                 type: string
 *               percentageWorth:
 *                 type: integer
 *               result:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated exam object
 *       404:
 *         description: Exam not found
 */
router.patch('/:id', protect, updateExam);

/**
 * @swagger
 * /api/exams/{id}:
 *   delete:
 *     summary: Delete an exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Confirmation message
 *       404:
 *         description: Exam not found
 */
router.delete('/:id', protect, deleteExam);

module.exports = router;
