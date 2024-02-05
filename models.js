const mongoose = require('mongoose');

// Define Category Schema
const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  color: { type: String, default: 'orange' }, // assuming color is a string in MongoDB
});

const Category = mongoose.model('Category', categorySchema);

// Define Meal Schema
const mealSchema = new mongoose.Schema({
  id: { type: String, required: true },
  categories: [{ type: String, required: true }],
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  duration: { type: Number, required: true },
  complexity: { type: String, enum: ['simple', 'challenging', 'hard'], required: true },
  affordability: { type: String, enum: ['affordable', 'pricey', 'luxurious'], required: true },
  isGlutenFree: { type: Boolean, required: true },
  isLactoseFree: { type: Boolean, required: true },
  isVegan: { type: Boolean, required: true },
  isVegetarian: { type: Boolean, required: true },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = { Category, Meal };

