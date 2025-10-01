const express = require('express');
const { getAllUserData } = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @openapi
 * /workouts/all:
 *   get:
 *     tags:
 *       - Workouts
 *     summary: Get all user data
 *     description: Fetches all of the logged-in user's data (sessions, templates, etc.). This is intended for the initial data hydration after a user logs in.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All user data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WorkoutSession'
 *                 templates:
 *                   type: array
 *                   items:
 *                     type: object # Define WorkoutTemplate schema if needed
 *       401:
 *         description: Not authorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/all', protect, getAllUserData);

module.exports = router;