// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the HTML elements
    const teamSelect = document.getElementById('teamSelect');
    const continueButton = document.getElementById('continueButton');
  
    // Add event listener to the Continue button
    continueButton.addEventListener('click', function () {
      // Get the chosen team
      const chosenTeam = teamSelect.value;
  
      // Save the chosen team to local storage
      localStorage.setItem('chosenTeam', chosenTeam);
  
      // Redirect to the waiting.html page
      window.location.href = 'waiting.html';
    });
  });
  