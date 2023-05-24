const express = require('express');
const multer = require('multer');
const path = require('path');

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
  const teamData = bindTeamData(chosenTeam);
  res.json({ teamData });
});

app.get('/game-play', (req, res) => {
  res.json({ startTime });
});

app.post('/game-play', upload.single('file'), (req, res) => {
  // Save the file in '/files' folder
  const file = req.file;
  res.sendStatus(200);
});

function bindTeamData(chosenTeam) {
    const locationData = require('./locationData.json');
    const teams = {
      1: locationData.Locations.slice(0, 6),
      2: locationData.Locations.slice(1, 7).concat(locationData.Locations[0]),
      3: locationData.Locations.slice(2, 7).concat(locationData.Locations.slice(0, 2)),
      4: locationData.Locations.slice(3, 7).concat(locationData.Locations.slice(0, 3)),
      5: locationData.Locations.slice(4, 7).concat(locationData.Locations.slice(0, 4)),
      6: locationData.Locations.slice(5, 7).concat(locationData.Locations.slice(0, 5)),
    };
    return teams[chosenTeam];
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Default route, serve landing.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
