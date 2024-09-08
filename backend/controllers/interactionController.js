const db = require('../database');

const logInteraction = (req, res) => {
  const { storyId, sectionId, choiceId, timeSpent } = req.body;

  if (!storyId || !sectionId || !choiceId || !timeSpent) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  console.log(`Interaction received(interactionControl): storyId=${storyId}, sectionId=${sectionId}, choiceId=${choiceId}, timeSpent=${timeSpent}ms`);

  const sql = 'INSERT INTO interactions (storyId, sectionId, choiceId, timeSpent) VALUES (?, ?, ?, ?)';
  const params = [storyId, sectionId, choiceId, timeSpent];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error saving interaction:', err.message);
      return res.status(500).json({ message: 'Failed to save interaction.' });
    }
    res.status(201).json({ message: 'Interaction saved successfully!' });
  });
};

module.exports = { logInteraction };


