const MealPlan = require('../models/MealPlan');

// Initialize weekly meal plan for a user
exports.initializeWeek = async (req, res) => {
  try {
    const userId = req.body.userId || 'default';
    
    // Check if meals already exist for this user
    const existingMeals = await MealPlan.find({ userId });
    
    if (existingMeals.length > 0) {
      return res.status(200).json(existingMeals);
    }
    
    // Create default empty week
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealPlans = [];
    
    for (const day of daysOfWeek) {
      const newDay = new MealPlan({
        day,
        meals: {
          breakfast: '',
          lunch: '',
          dinner: ''
        },
        userId
      });
      
      await newDay.save();
      mealPlans.push(newDay);
    }
    
    res.status(201).json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get meal plans for a user
exports.getMealPlans = async (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const mealPlans = await MealPlan.find({ userId }).sort({ 
      day: 1 // Sort by day
    });
    
    if (mealPlans.length === 0) {
      // If no meal plans exist, initialize them
      return this.initializeWeek(req, res);
    }
    
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a meal
exports.updateMeal = async (req, res) => {
  try {
    const { day, mealType, mealContent, userId } = req.body;
    
    if (!day || !mealType || mealContent === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Find and update meal
    const mealPlan = await MealPlan.findOne({ day, userId: userId || 'default' });
    
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    
    // Update the specific meal
    mealPlan.meals[mealType] = mealContent;
    await mealPlan.save();
    
    res.status(200).json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};