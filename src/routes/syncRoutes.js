const express = require('express');
const { syncData } = require('../controllers/syncController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// This is the main endpoint for the Redux Offline outbox to hit.
router.post('/', protect, syncData);

module.exports = router;