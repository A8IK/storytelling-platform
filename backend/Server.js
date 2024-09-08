const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database');
const storiesRoutes = require('./routes/storiesRoutes'); 
const analyticsRoutes = require('./routes/analyticsRoutes'); 
const interactionRoutes = require('./routes/interactionRoutes');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/api/interactions', interactionRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/analytics', analyticsRoutes);

app.post('/api/stories', (req, res) => {
    console.log('POST /api/stories request received with body:', req.body);
    res.json({ message: 'Story created' });
});

app.post('/api/interactions', (req, res) => {
    const { storyId, sectionId, choiceId, timeSpent } = req.body;
    console.log(`Interaction received: storyId=${storyId}, sectionId=${sectionId}, choiceId=${choiceId}, timeSpent=${timeSpent}ms`);
    res.json({ message: 'Interaction saved' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
