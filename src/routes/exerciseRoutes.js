const express = require('express');
const { getExercises, getCategories } = require('../controllers/exerciseController');

const router = express.Router();

router.get('/', getExercises);
router.get('/categories', getCategories);

module.exports = router;