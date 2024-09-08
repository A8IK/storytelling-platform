import React, { useState } from 'react';
import axios from 'axios';

const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [content, setContent] = useState('');
  const [options, setOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting story:', { title, sectionId, content, options }); // Logging data before sending
      const response = await axios.post('http://localhost:3001/api/stories', {
        title,
        sectionId,
        content,
        options,
      });
      console.log('Story created:', response.data); // Logging response data
    } 
    catch (error) {
      console.error('Error creating story:', error); // Logging error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required/>
      <input
        type="text"
        value={sectionId}
        onChange={(e) => setSectionId(e.target.value)}
        placeholder="Section ID"
        required/>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required/>
      <input
        type="text"
        value={options.join(', ')}
        onChange={(e) => setOptions(e.target.value.split(',').map(opt => opt.trim()))}
        placeholder="Options (comma-separated)"/>
      <button type="submit">Create Story</button>
    </form>
  );
};

export default CreateStory;
