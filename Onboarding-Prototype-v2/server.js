const express = require('express');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(fileUpload());

let chosenTeam = '';
let startTime = '';

// Serve static files from the 'files' directory
app.use('/files', express.static(path.join(__dirname, 'files')));


const storage = multer.diskStorage({
  destination: './files',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload-image', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.image;

  file.mv(path.join(__dirname, 'files', file.name), (err) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).send('Error uploading file.');
    }

    res.send('File uploaded successfully.');
  });
});

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
  const filesDirectory = path.join(__dirname, 'files');

  fs.readdir(filesDirectory, (err, filenames) => {
    if (err) {
      console.error('Error reading files:', err);
      res.status(500).json({ error: 'Error reading files' });
      return;
    }

    const fileData = filenames.map((filename) => {
      const filePath = `/files/${filename}`;
      const fileType = getFileType(filename);
      return { filename, type: fileType, path: filePath };
    });

    res.json({ files: fileData });
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
