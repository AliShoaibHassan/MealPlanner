import axios from 'axios';

// Use an environment variable to define the API base URL
// This variable will be set in the docker-compose.yml
const API_BASE_URL = 'http://54.208.135.27:5100/api/meals'; // For Vite projects


// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Use the base URL from the environment variable
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service functions - Modify to use relative paths from the base URL
export const getMealPlans = async (userId = 'default') => {
  try {
    // The base URL already includes /api/meals, so append query params directly
    const response = await apiClient.get(`http://54.208.135.27:5100/api/meals?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    throw error;
  }
};

export const initializeMealPlans = async (userId = 'default') => {
  try {
    // The base URL already includes /api/meals
    const response = await apiClient.post('/initialize', { userId });
    return response.data;
  } catch (error) {
    console.error('Error initializing meal plans:', error);
    throw error;
  }
};

export const updateMeal = async (day, mealType, mealContent, userId = 'default') => {
  try {
    // The base URL already includes /api/meals
    const response = await apiClient.post('/update', {
      day,
      mealType,
      mealContent,
      userId
    });
    return response.data;
    //Testing
  } catch (error) {
    console.error('Error updating meal:', error);
    throw error;
  }
};
