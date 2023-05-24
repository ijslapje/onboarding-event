// Get the gallery container element
const galleryContainer = document.getElementById('gallery');

fetch('/file-showcase')
  .then(response => response.json())
  .then(data => {
    const files = data.files;
    for (const file of files) {
      const url = `/files/${file.filename}`;

      // Create a card element for each file
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');

      // Create an image or video element based on the file type
      let mediaElement;
      if (file.type === 'image') {
        mediaElement = document.createElement('img');
      } else if (file.type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
      }

      mediaElement.src = `/${url}`; // Update the URL

      // Append the media element to the card element
      cardElement.appendChild(mediaElement);

      // Append the card element to the gallery container
      galleryContainer.appendChild(cardElement);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
