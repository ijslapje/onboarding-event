// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the continue button
    const continueButton = document.getElementById('continueButton');
    if (continueButton) {
      continueButton.addEventListener('click', function () {
        const teamDropdown = document.getElementById('teamDropdown');
        if (teamDropdown) {
          const chosenTeam = teamDropdown.value;
          // Store the chosen team in localStorage
          localStorage.setItem('chosenTeam', chosenTeam);
          
          // Redirect to game-load.html
          window.location.href = `game-load.html?team=${encodeURIComponent(chosenTeam)}`;
        } else {
          console.error('Team dropdown element not found.');
        }
      });
    } else {
      console.error('Continue button element not found.');
    }
  });
  