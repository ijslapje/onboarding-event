// Add event listener to the confirm button
document.getElementById("confirmButton").addEventListener("click", function () {
    const teamCount = parseInt(document.getElementById("teamCount").value);
    sendDataAndConfirm(teamCount);
  });
  
  function sendDataAndConfirm(teamCount) {
    // Fetch the JSON data from the external file
    fetch('../locationData.json')
      .then(response => response.json())
      .then(data => {
        const locationData = data;
        const result = sendData(teamCount, locationData);
  
        // Store the result in localStorage
        localStorage.setItem('teacherAppData', JSON.stringify(result));
        // Redirect to photo-showcase.html
        window.location.href = 'photo-showcase.html';
      })
      .catch(error => console.error(error));
  }
  
  function sendData(teamCount, locationData) {
    let gameStart = false;
    let startTime;
  
    // Get the locations data from the JSON file
    const locations = locationData.Locaties[0];
  
    // Array to store the teams
    const teams = [];
  
    // Get the keys of the locations object
    const locationKeys = Object.keys(locations);
  
    // Iterate over each team
    for (let i = 0; i < teamCount; i++) {
      // Create an object for the team
      const team = {
        name: `Team ${i + 1}`,
        locations: []
      };
  
      // Calculate the start location index based on the team's index
      const startLocationIndex = i % locationKeys.length;
  
      // Iterate from the start location index to the end of the location keys array
      for (let j = startLocationIndex; j < locationKeys.length; j++) {
        const locationKey = locationKeys[j];
        const location = locations[locationKey][0];
        team.locations.push(location);
      }
  
      // Iterate from the beginning of the location keys array to the start location index
      for (let j = 0; j < startLocationIndex; j++) {
        const locationKey = locationKeys[j];
        const location = locations[locationKey][0];
        team.locations.push(location);
      }
  
      // Add the team to the teams array
      teams.push(team);
    }
  
    // Get the current date and time
    const currentDate = new Date();
  
    // Get the hours, minutes, and seconds of the current time
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  
    // Set the startTime to the formatted time
    startTime = `${hours}:${minutes}:${seconds}`;
  
    // Set game start to true
    gameStart = true;
  
    // Return the data object
    return {
      startTime: startTime,
      teamData: teams,
      gameStart: gameStart
    };
  }
  