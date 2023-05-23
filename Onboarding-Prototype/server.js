const express = require('express');
const path = require('path');
const locationData = require('./locationData.json');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/admin', (req, res) => {
  // Check if the password is provided
  const password = req.query.password;
  if (password === '1234') {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/team-select', (req, res) => {
  // Retrieve the chosen teams from locationData.json and send them to team-select.html
  const teams = Object.keys(locationData.Locaties[0]);

  res.sendFile(path.join(__dirname, 'public', 'team-select.html'), {
    teams: teams
  });
});

app.get('/start-game', (req, res) => {
    const chosenTeam = req.query.team;
    const teamData = locationData.Locaties[0][chosenTeam];
    const startTime = new Date().toISOString();
  
    res.json({
      chosenTeam: chosenTeam,
      startTime: startTime,
      teamData: teamData
    });
  });  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
