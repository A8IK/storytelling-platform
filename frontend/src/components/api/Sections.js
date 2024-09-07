import axios from 'axios';

const API_URL = 'http://localhost:3001/api/sections';

// Fetch a specific section of a story
export const fetchSectionById = async (storyId, sectionId) => {
  const response = await axios.get(`${API_URL}/${storyId}/sections/${sectionId}`);
  return response.data;
};

// Create a new section in a story
export const createSection = async (storyId, newSection) => {
  const response = await axios.post(`${API_URL}/${storyId}/sections`, newSection);
  return response.data;
};
