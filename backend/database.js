const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./stories.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } 
  else {
    console.log('Connected to the SQLite database.');

    db.run(`CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating stories table:', err.message);
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyId INTEGER,
        title TEXT,
        content TEXT,
        choices TEXT,
        FOREIGN KEY (storyId) REFERENCES stories(id)
    )`, (err) => {
      if (err) {
        console.error('Error creating sections table:', err.message);
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyId INTEGER,
        sectionId INTEGER,
        choiceId INTEGER,
        timeSpent INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (storyId) REFERENCES stories(id),
        FOREIGN KEY (sectionId) REFERENCES sections(id)
    )`, (err) => {
      if (err) {
        console.error('Error creating interactions table:', err.message);
      }
    });
  }
});

module.exports = db;

