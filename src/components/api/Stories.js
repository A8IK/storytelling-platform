import axios from 'axios';

const API_URL = 'http://localhost:3001/api/stories';

// Fetch all stories
export const fetchStories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a story by ID
export const fetchStoryById = async (storyId) => {
  const response = await axios.get(`${API_URL}/${storyId}`);
  return response.data;
};

// Create a new story
export const createStory = async (newStory) => {
  const response = await axios.post(API_URL, newStory);
  return response.data;
};
