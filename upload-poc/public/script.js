// Function to fetch and display the uploaded images
function fetchImages() {
    fetch('/images')
      .then(response => response.json())
      .then(images => {
        const gallery = document.querySelector('.gallery');
  
        // Clear existing gallery items
        gallery.innerHTML = '';
  
        // Create new gallery items for each image
        images.forEach(image => {
          const galleryItem = document.createElement('div');
          galleryItem.className = 'gallery-item';
  
          const img = document.createElement('img');
          img.src = `files/${image.filename}`;
  
          galleryItem.appendChild(img);
          gallery.appendChild(galleryItem);
        });
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }
  
  // Call the fetchImages function when the page loads
  window.addEventListener('load', fetchImages);
  
  // Handle the form submission
  document.getElementById('uploadForm').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      fetchImages(); // Update the gallery after successful upload
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  });
  