// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  fetch('/game-load')
    .then(response => response.json())
    .then(data => {
      const personalTeamData = data;
      console.log(personalTeamData);

      setTimeout(function () {
        const loadingContainer = document.getElementById('loadingContainer');
        const continueContainer = document.getElementById('continueContainer');

        loadingContainer.classList.add('hidden');
        continueContainer.classList.remove('hidden');

        // Add click event listener to the continue button
        const continueButton = document.getElementById('continueButton');
        continueButton.addEventListener('click', function () {
          fetch('/game-play', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ personalTeamData })
          })
            .then(response => {
              if (response.ok) {
                // Redirect to the game-play.html page
                window.location.href = 'game-play.html';
              } else {
                console.error('Error:', response.status);
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });
      }, 2000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
