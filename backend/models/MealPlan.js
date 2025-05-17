const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  meals: {
    breakfast: {
      type: String,
      default: ''
    },
    lunch: {
      type: String,
      default: ''
    },
    dinner: {
      type: String,
      default: ''
    }
  },
  userId: {
    type: String,
    default: 'default'  // In a real app, this would be linked to user authentication
  }
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);