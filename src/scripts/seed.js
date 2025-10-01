const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const Exercise = require('../models/Exercise');
const connectDB = require('../config/db');

dotenv.config({ path: './.env' }); // Make sure path is correct

connectDB();

const categories = require('./data/categories.json');
const exercisesData = require('./data/exercises.json');

const importData = async () => {
  try {
    await Category.deleteMany();
    await Exercise.deleteMany();

    const createdCategories = await Category.insertMany(categories);

    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    const exercisesToInsert = exercisesData.map(exercise => {
      return { ...exercise, category: categoryMap[exercise.category] };
    });

    await Exercise.insertMany(exercisesToInsert);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Category.deleteMany();
    await Exercise.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}