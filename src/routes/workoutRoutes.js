const express = require('express');
const { getAllUserData } = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// This endpoint is for the initial data fetch after a user logs in.
router.get('/all', protect, getAllUserData);

module.exports = router;