const express = require('express');
const router = express.Router();
const db = require('../database');
const { getSectionById } = require('../controllers/storiesController');

router.get('/:storyId/sections/:sectionId', getSectionById);

module.exports = router;

