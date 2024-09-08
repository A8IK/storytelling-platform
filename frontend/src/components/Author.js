import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAnalytics } from './api/Analytics';
import { createStory } from './api/Stories';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const Author = ({ storyId }) => {
  const [analytics, setAnalytics] = useState([]);
  const [newStory, setNewStory] = useState({ title: '', sectionId: '', content: '', options: [] });
  const [option, setOption] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const data = await fetchAnalytics(storyId);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    if(storyId){
      fetchAnalyticsData();
    }
  }, [storyId]);

  const handleAddOption = () => {
    setNewStory((prevStory) => ({
      ...prevStory,
      options: [...prevStory.options, option],
    }));
    setOption('');
  };

  const handleSubmitStory = async (e) => {
    e.preventDefault();
    try {
      await createStory(newStory);
      alert('Story added successfully!');
      setNewStory({ title: '', sectionId: '', options: [] });
    } catch (error) {
      console.error('Error adding story:', error);
      alert('Failed to add story.');
    }
  };

  const handleBackClick = async () => {
    navigate('/')
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/muddyGlass.jpg)' }}>
      <div className="container mx-auto p-4 bg-amber-600 bg-opacity-70 borer rounded-3xl">
      <button
          onClick={handleBackClick}
          className="mb-6 ml-8 mt-5 px-5 py-2 bg-neutral-600 text-white rounded hover:bg-blue-700 transition duration-400 flex items-center">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>
        <h2 className="text-xl ml-10 font-bold mb-4">Story Analytics</h2>
        <table className="w-full ml-10 table-auto mb-6">
          <thead>
            <tr>
              <th>Section</th>
              <th>Choice</th>
              <th>Times Chosen</th>
              <th>Average Time Spent (s)</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map((entry, index) => (
              <tr key = {index}>
                <td>{entry.sectionId}</td>
                <td>{entry.choiceId}</td>
                <td>{entry.count}</td>
                <td>{entry.avgTimeSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className = "text-xl font-bold ml-10 mb-4">Add your Story</h2>
        <form onSubmit = {handleSubmitStory} className="mb-4 ml-auto w-5/6">
          <div className="mb-2">
            <label className = "block text-sm font-medium">Story Title</label>
            <input
              type="text"
              value={newStory.title}
              onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
              className="w-2/5 sm:w-5/5 p-2 border rounded"
              required/>
          </div>
          <div className="mb-4">
          <label className="block text-sm font-medium">Story</label>
          <textarea
            value={newStory.content}
            onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
            className="w-3/5 sm:w-4/5 h-40 p-2 border rounded resize-none"
            required/>
        </div>
          <div className="mb-2 mr-12">
            <label className="block text-sm font-medium">Section ID</label>
            <input
              type="text"
              value={newStory.sectionId}
              onChange={(e) => setNewStory({ ...newStory, sectionId: e.target.value })}
              className="w-3/5 sm:w-2/5 p-2 border rounded"
              required/>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Add Option</label>
            <div className="flex w-3/5 sm:w-3/5">
              <input
                type="text"
                value={option}
                onChange={(e) => setOption(e.target.value)}
                className="flex-1 p-2 border rounded"/>
              <button
                type="button"
                onClick={handleAddOption}
                className="ml-2 px-4 py-2 bg-neutral-600 text-white rounded hover:bg-blue-600 transition duration-400">
                Add Option
              </button>
            </div>
          </div>

          <ul className="mb-2">
            {newStory.options.map((opt, index) => (
              <li key={index} className="text-sm">
                {opt}
              </li>
            ))}
          </ul>

          <button type="submit" className="px-4 py-2 bg-yellow-900 text-white rounded hover:bg-blue-600 transition duration-400">
            Submit Story
          </button>
        </form>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default Author;
