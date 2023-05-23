// Fetch the image URLs from the server and display them in the gallery
fetch('/images')
  .then(response => response.json())
  .then(data => {
    const galleryElement = document.getElementById('gallery');
    data.images.forEach(imagePath => {
      const imageElement = document.createElement('img');
      imageElement.src = `/images/${imagePath}`;
      galleryElement.appendChild(imageElement);
    });
  })
  .catch(error => {
    console.error('Error fetching images:', error);
  });
