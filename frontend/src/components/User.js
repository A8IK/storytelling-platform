import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { fetchSectionById } from './api/Sections'; 

const User = ({ storyId = 1}) => {
  const [currentSection, setCurrentSection] = useState(null);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    if (storyId) {
      fetchSection(1);
    } 
    else {
      console.error('Story ID is not provided');
    }
  }, [storyId]);

  const fetchSection = async (sectionId) => {
    if (!storyId || !sectionId) {
      console.error('Story ID is required to fetch section');
      return;
    }
    console.log(`Request URL: /api/stories/${storyId}/sections/${sectionId}`);

    try {
      console.log(`Fetching section ${sectionId} for story ${storyId}`);

      const response = await fetchSectionById(storyId, sectionId);

      console.log('Section Data:', response); // Debugging for check API response
      console.log('Choices Array:', response.choices);

      if (response) {
        setCurrentSection(response);
        setStartTime(Date.now()); // Reset startTime for the new section
        setError(null);
      } 
      else {
        setError('No section found');
      }
    } 
    catch (error) {
      console.error('Error fetching section:', error.response ? error.response.data : error.message);
      setError('Error loading section');
      setCurrentSection(null);
    }
  };

  const handleChoice = async (choice) => {

    console.log('Selected Choice:', choice); // Debugging for the choice object

    if ( !choice.id) {
      console.error('Choice ID is missing or choice is undefined');
      setError('Choice ID is missing');
      return;
    }

    if (!choice.nextSectionId) {
      console.error('Next Section ID is missing or null');
      setError('No next section defined for this choice.');
      return;
    }
  
    console.log('Fetching next section with ID:', choice.nextSectionId); // Debugging
  
    try {
      await axios.post(`http://localhost:3001/api/interactions`, {
        storyId,
        sectionId: currentSection.id,
        choiceId: choice.id,
        timeSpent: Date.now() - startTime
      });

      try {
        await fetchSection(storyId, choice.nextSectionId);  // Fetch the next section
      } 
      catch (error) {
        console.error('Error fetching next section:', error);
        setError('Failed to fetch next section');
      }
    } 
    catch (error) {
      console.error('Error tracking interaction:', error.response ? error.response.data : error.message);
      setError('Error handling choice');
    }
  };
  

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!currentSection) {
    return <div className="loading-message">Loading...</div>;
  }

return (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">{currentSection.title}</h1>
    <p className="mb-4">{currentSection.content}</p>
    <div className="choices">
      {currentSection.choices && currentSection.choices.length > 0 ? (
        currentSection.choices.map((choice) => {
          if (!choice.id) {
            console.error('Choice ID is missing');
            return null; 
          }

          return (
            <button
              key={choice.id}
              className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
              onClick={() => handleChoice(choice)}>
              {choice.text}
            </button>
          );
        })
      ) : (
        <p>No choices available.</p>
      )}
    </div>
  </div>
);

};

export default User;
