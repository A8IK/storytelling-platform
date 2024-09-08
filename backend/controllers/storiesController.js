const db = require('../database');

const getSectionById = (req, res) => {
  const { storyId, sectionId } = req.params;

  console.log(`Fetching section ${sectionId} for story ${storyId}`);

  //fetch the section for the story
  db.get('SELECT * FROM sections WHERE storyId = ? AND id = ?', [storyId, sectionId], (err, row) => {
    
    console.log('Row fetched from database:', row);
    
    if (err) {
        console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
        console.log('Section not found for storiesController');
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json({
      id: row.id,
      title: row.title,
      content: row.content,
      choices: JSON.parse(row.choices)
    });
  });
};

module.exports = { getSectionById };

