import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = ({ storyId }) => {
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    fetchSection(1);
  }, []);

  const fetchSection = async (sectionId) => {
    const response = await axios.get(`/api/stories/${storyId}/sections/${sectionId}`);
    setCurrentSection(response.data);
  };

  const handleChoice = async (choice) => {
    // Tracking interaction and move to next section
    await axios.post(`/api/interactions`, {
      storyId,
      sectionId: currentSection.id,
      choiceId: choice.id,
      timeSpent: Date.now() - startTime
    });
    fetchSection(choice.nextSectionId);
  };

  if (!currentSection) return <div>Loading...</div>;

  const startTime = Date.now();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{currentSection.title}</h1>
      <p className="mb-4">{currentSection.content}</p>
      <div className="choices">
        {currentSection.choices.map((choice) => (
          <button
            key={choice.id}
            className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
            onClick={() => handleChoice(choice)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default User;
