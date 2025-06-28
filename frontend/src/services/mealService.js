import axios from 'axios';

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://backend:5100/api/meals';

console.log('Using API URL:', API_BASE_URL);

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service functions
export const getMealPlans = async (userId = 'default') => {
  try {
    const response = await apiClient.get(`?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    throw error;
  }
};

export const initializeMealPlans = async (userId = 'default') => {
  try {
    const response = await apiClient.post('/initialize', { userId });
    return response.data;
  } catch (error) {
    console.error('Error initializing meal plans:', error);
    throw error;
  }
};

export const updateMeal = async (day, mealType, mealContent, userId = 'default') => {
  try {
    const response = await apiClient.post('/update', {
      day,
      mealType,
      mealContent,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error updating meal:', error);
    throw error;
  }
};
