// Function to fetch and update the gallery with images
function fetchImages() {
    fetch('/images')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching images: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Process the fetched images data
        console.log('Fetched Images:', data);
        // Update the gallery with the fetched images
        updateGallery(data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }
  
  // Function to update the gallery with the fetched images
  function updateGallery(images) {
    const gallery = document.querySelector('.gallery');
  
    // Clear the gallery
    gallery.innerHTML = '';
  
    // Loop through the images and create HTML elements for each image
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = image.name;
  
      const figureElement = document.createElement('figure');
      figureElement.appendChild(imgElement);
  
      const captionElement = document.createElement('figcaption');
      captionElement.textContent = image.name;
      figureElement.appendChild(captionElement);
  
      gallery.appendChild(figureElement);
    });
  }
  
  // Call fetchImages initially to load the gallery
  fetchImages();
  