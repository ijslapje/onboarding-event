// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the chosen team from local storage
    const chosenTeam = localStorage.getItem('chosenTeam');
    console.log('Chosen Team:', chosenTeam);
  
    // Retrieve the team data from server using the chosen team
    fetch(`/start-game?team=${encodeURIComponent(chosenTeam)}`)
      .then(response => response.json())
      .then(data => {
        const teamData = data.teamData;
        const startTime = data.startTime;
  
        // Store the team data and start time in localStorage
        localStorage.setItem('teamData', JSON.stringify(teamData));
  
        // Format the start time
        const formattedStartTime = formatTime(startTime);
  
        // Store the formatted start time in localStorage
        localStorage.setItem('formattedStartTime', formattedStartTime);
  
        // Hide the loading container and show the continue container after 5 seconds
        setTimeout(function () {
          const loadingContainer = document.getElementById('loadingContainer');
          const continueContainer = document.getElementById('continueContainer');
  
          loadingContainer.classList.add('hidden');
          continueContainer.classList.remove('hidden');
  
          // Add click event listener to the continue button
          const continueButton = document.getElementById('continueButton');
          continueButton.addEventListener('click', function () {
            // Pass the formatted start time to game.html via URL parameter
            window.location.href = `game.html?startTime=${encodeURIComponent(formattedStartTime)}`;
          });
        }, 2000);
      })
      .catch(error => console.error(error));
  });
  
  function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }
  