import React, { useState } from 'react';
import { createSection } from './api/Sections';

const CreateStory = ({ storyId }) => {
  const [content, setContent] = useState('');
  const [choices, setChoices] = useState([{ text: '', nextSectionId: '' }]);
  const addChoice = () => setChoices([...choices, { text: '', nextSectionId: '' }]);

  const handleCreateSection = async () => {
    try {
      await createSection(storyId, { content, choices });
      setContent('');
      setChoices([{ text: '', nextSectionId: '' }]);
    } 
    catch (error) {
      console.error('Error creating section:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create New Section</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Section content"
        value={content}
        onChange={(e) => setContent(e.target.value)}/>
      {choices.map((choice, index) => (
        <div key={index} className="flex space-x-4 mb-2">
          <input
            className="p-2 border rounded"
            placeholder="Choice text"
            value={choice.text}
            onChange={(e) => {
              const newChoices = [...choices];
              newChoices[index].text = e.target.value;
              setChoices(newChoices);
            }}/>
          <input
            className="p-2 border rounded"
            placeholder="Next Section ID"
            value={choice.nextSectionId}
            onChange={(e) => {
              const newChoices = [...choices];
              newChoices[index].nextSectionId = e.target.value;
              setChoices(newChoices);
            }}/>
        </div>
      ))}
      <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={addChoice}>
        Add Choice
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded ml-4" onClick={handleCreateSection}>
        Create Section
      </button>
    </div>
  );
};

export default CreateStory;
