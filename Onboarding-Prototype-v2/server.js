const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

let chosenTeam = '';
let startTime = '';

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'files'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage });

app.post('/game-prepare', (req, res) => {
  chosenTeam = req.body.chosenTeam;
  res.sendStatus(200);
});

app.post('/adminScript', (req, res) => {
  startTime = req.body.startTime;
  res.sendStatus(200);
});

app.get('/game-load', (req, res) => {
  const teamData = teamOrder(chosenTeam);
  console.log(chosenTeam);
  res.json(teamData);
});

app.get('/game-play', (req, res) => {
  res.json({ startTime });
});

app.post('/game-play', upload.single('file'), (req, res) => {
  // Save the file in '/files' folder
  const file = req.file;
  res.sendStatus(200);
});

app.get('/file-showcase', (req, res) => {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) {
      console.error('Error:', err);
      res.sendStatus(500);
    } else {
      const fileData = files.map((file) => {
        const filePath = path.join('files', file);
        const fileType = getFileType(file);
        return { filename: file, type: fileType };
      });
      res.json({ files: fileData });
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

function teamOrder(chosenTeam) {
  const locationData = require('./locationData.json');
  const locations = locationData.Locations[0];

  console.log('chosenTeam:', chosenTeam);
  console.log('locations:', locations);

  const teams = {
    team1: [0, 1, 2, 3, 4, 5],
    team2: [1, 2, 3, 4, 5, 0],
    team3: [2, 3, 4, 5, 0, 1],
    team4: [3, 4, 5, 0, 1, 2],
    team5: [4, 5, 0, 1, 2, 3],
    team6: [5, 0, 1, 2, 3, 4],
  };

  const teamOrder = teams[chosenTeam];

  console.log('teamOrder:', teamOrder);

  if (!teamOrder) {
    throw new Error('Invalid chosen team');
  }

  const teamData = {};
  for (let i = 0; i < teamOrder.length; i++) {
    const locationIndex = teamOrder[i];
    const locationName = Object.keys(locations)[locationIndex];
    teamData[locationName] = locations[locationName];
  }

  return teamData;
}

function getFileType(filename) {
  const extension = path.extname(filename).toLowerCase();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (videoExtensions.includes(extension)) {
    return 'video';
  } else {
    return 'unknown';
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
