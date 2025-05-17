
const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Routes
router.get('/', mealController.getMealPlans);
router.post('/initialize', mealController.initializeWeek);
router.post('/update', mealController.updateMeal);

module.exports = router;