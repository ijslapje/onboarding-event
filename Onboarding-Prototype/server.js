const express = require('express');
const path = require('path');
const multer = require('multer');
const locationData = require('./locationData.json');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Create a storage instance for multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public', 'images'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

// Handle the file upload
app.post('/upload-image', upload.single('image'), (req, res) => {
  res.sendStatus(200);
});

app.get('/images', (req, res) => {
    const imagesPath = path.join(__dirname, 'public', 'images');
    fs.readdir(imagesPath, (err, files) => {
      if (err) {
        console.error('Error reading images directory:', err);
        res.status(500).json([]);
      } else {
        const imageNames = files.filter(file => {
          return file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png');
        });
        res.json(imageNames);
      }
    });
  });

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