// Get photo/videos from 'files' and show them on the HTML page
fetch('/files')
  .then(response => response.json())
  .then(data => {
    const files = data.files;
    for (const file of files) {
      const url = `/files/${file.filename}`;

      if (file.type.startsWith('image')) {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        document.body.appendChild(imgElement);
      } else if (file.type.startsWith('video')) {
        const videoElement = document.createElement('video');
        videoElement.src = url;
        videoElement.controls = true;
        document.body.appendChild(videoElement);
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
