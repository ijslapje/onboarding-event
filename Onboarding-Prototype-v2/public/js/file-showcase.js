/**
 * Retrieves files from the server and displays them in the gallery container.
 */
function fetchAndDisplayFiles() {
  /**
   * Represents a card element for a file.
   *
   * @typedef {Object} CardElement
   * @property {HTMLElement} cardElement - The card element.
   * @property {HTMLMediaElement} mediaElement - The media element (image or video).
   */

  // Get the gallery container element
  const galleryContainer = document.getElementById('gallery');

  console.log('Fetching files...');

  fetch('/file-showcase')
    .then(response => response.json())
    .then(data => {
      console.log('Files received:', data);
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

        mediaElement.src = url; // Update the URL

        // Append the media element to the card element
        cardElement.appendChild(mediaElement);

        // Append the card element to the gallery container
        galleryContainer.appendChild(cardElement);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the function to fetch and display files
fetchAndDisplayFiles();
