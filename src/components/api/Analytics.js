import axios from 'axios';

const API_URL = 'http://localhost:3001/api/analytics';

//Recording user interaction
export const recordInteraction = async (interactionData) => {
  const response = await axios.post(API_URL, interactionData);
  return response.data;
};

//To get analytics data for a story
export const fetchAnalytics = async (storyId) => {
  const response = await axios.get(`${API_URL}/${storyId}`);
  return response.data;
};

export const addStory = async (storyData) => {
  const response = await axios.post(`${API_URL}/stories`, storyData); 
  return response.data;
};