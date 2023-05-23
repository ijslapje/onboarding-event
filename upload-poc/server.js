//npm install express multer
//npm install express express-fileupload

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(fileUpload());

// Serve the static files
app.use(express.static('public'));

// Route for serving the uploaded images
app.use('/files', express.static(path.join(__dirname, 'files')));

// Route for handling file upload
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Get the uploaded file
  const file = req.files.image;

  // Move the file to the desired folder
  file.mv(path.join(__dirname, 'files', file.name), (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded successfully.');
  });
});

// Route for fetching the uploaded images
app.get('/images', (req, res) => {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }

    const images = files
      .filter(file => file.endsWith('.jpg') || file.endsWith('.png'))
      .map(file => ({ filename: file }));

    res.json(images);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
