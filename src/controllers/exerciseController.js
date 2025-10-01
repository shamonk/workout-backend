const Exercise = require('../models/Exercise');
const Category = require('../models/Category');

// @desc    Fetch all exercises with filtering and pagination
// @route   GET /api/exercises
// @access  Public
const getExercises = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    const exercises = await Exercise.find(query).populate('category', 'name');
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch all categories
// @route   GET /api/exercises/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getExercises, getCategories };