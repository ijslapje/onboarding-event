// Get personal-teamData
fetch('/game-load')
  .then(response => response.json())
  .then(data => {
    const personalTeamData = data.teamData;
    // Use personalTeamData for further processing
  })
  .catch(error => {
    console.error('Error:', error);
  });
