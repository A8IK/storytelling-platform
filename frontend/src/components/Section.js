import React, { useState, useEffect } from 'react';
import { fetchSectionById, createSection } from './Sections';

const Section = ({ storyId, sectionId }) => {
  const [section, setSection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSection = async () => {
      try {
        const data = await fetchSectionById(storyId, sectionId);
        setSection(data);
      } 
      catch (err) {
        setError('Failed to load section.');
      }
    };

    getSection();
  }, [storyId, sectionId]);

  const handleCreateSection = async () => {
    try {
      const newSection = {
        title: 'New Section Title',
        content: 'New Section Content',
        choices: ['Choice 1', 'Choice 2']
      };
      await createSection(storyId, newSection);
    } 
    catch (err) {
      setError('Failed to create section.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!section) return <div>Loading...</div>;

  return (
    <div>
      <h1>{section.title}</h1>
      <p>{section.content}</p>
      <ul>
        {section.choices.map((choice, index) => (
          <li key={index}>{choice}</li>
        ))}
      </ul>
      <button onClick={handleCreateSection}>Create Section</button>
    </div>
  );
};

export default Section;
