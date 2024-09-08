const db = require('../database');
exports.getAnalytics = (req, res) => {
  const { storyId } = req.params;

  //get interactions related to the story
  const query = 
  `SELECT sectionId,
      COUNT(*) AS interactionsCount,
      AVG(timeSpent) AS averageTimeSpent
    FROM interactions
    WHERE storyId = ?
    GROUP BY sectionId`;

  db.all(query, [storyId], (err, rows) => {
    if (err) {
      console.error('Error fetching analytics:', err.message);
      return res.status(500).json({ error: 'Error fetching analytics' });
    }

    res.json({
      storyId,
      analytics: rows.map(row => ({
        sectionId: row.sectionId,
        interactionsCount: row.interactionsCount,
        averageTimeSpent: row.averageTimeSpent
      }))
    });
  });
};

