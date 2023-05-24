let startTime = '';

// Get startTime for the countdown from server.js
fetch('/game-play')
  .then(response => response.json())
  .then(data => {
    startTime = data.startTime;
    // Use startTime for the countdown
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Get teamData array and put it in the HTML
fetch('/game-load')
  .then(response => response.json())
  .then(data => {
    const teamData = data.teamData;
    // Use teamData for displaying in the HTML
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Send and upload Photo/Video to 'files' using server.js
const fileInput = document.getElementById('file-input'); // Assuming you have an input field with id 'file-input'
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  fetch('/game-play', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Failed to upload file');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
