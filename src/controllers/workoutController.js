const WorkoutSession = require('../models/WorkoutSession');
const WorkoutTemplate = require('../models/WorkoutTemplate');

// @desc    Get all data for initial sync (after login)
// @route   GET /api/workouts/all
// @access  Private
const getAllUserData = async (req, res) => {
    try {
        const sessions = await WorkoutSession.find({ user: req.user._id });
        const templates = await WorkoutTemplate.find({ user: req.user._id });

        res.json({
            sessions,
            templates,
            stats: {} // Placeholder for future stats
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error fetching user data" });
    }
}

module.exports = { getAllUserData };