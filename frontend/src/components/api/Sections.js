import axios from 'axios';

const API_URL = 'http://localhost:3001/api/stories';

export const fetchSectionById = async (storyId, sectionId) => {
  if (!storyId || !sectionId) {
    throw new Error('Story ID or Section ID is missing');
  }

  try {
    const response = await axios.get(`${API_URL}/${storyId}/sections/${sectionId}`);
    console.log('API Response SectionsJs:', response.data);
    const transformedData = {
      ...response.data,
      choices: response.data.choices.map((text, index) => ({
        id: index + 1,
        text,
        nextSectionId: response.data.nextSectionIds ? response.data.nextSectionIds[index] : null // Ensure this value is coming from the backend or assign a default
      }))
    };

    console.log('Transformed API Response:', transformedData);
    return transformedData;
  } 
  catch (error) {
    console.error('Error fetching section:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch section');
  }
};

export const createSection = async (storyId, newSection) => {
  try {
    const response = await axios.post(`${API_URL}/${storyId}/sections`, newSection);
    return response.data;
  } 
  catch (error) {
    console.error('Error creating section:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create section');
  }
};
