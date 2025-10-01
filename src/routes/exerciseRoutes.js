const express = require('express');
const { getExercises, getCategories } = require('../controllers/exerciseController');
const router = express.Router();

/**
 * @openapi
 * /exercises:
 *   get:
 *     tags:
 *       - Exercises
 *     summary: Retrieve a list of exercises
 *     description: Fetches a list of all available exercises. Can be filtered by search query or category.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: A search term to filter exercises by name.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The name of a category to filter exercises.
 *     responses:
 *       200:
 *         description: A list of exercises.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
router.get('/', getExercises);

/**
 * @openapi
 * /exercises/categories:
 *   get:
 *     tags:
 *       - Exercises
 *     summary: Retrieve all exercise categories
 *     description: Fetches a list of all available exercise categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/categories', getCategories);

module.exports = router;