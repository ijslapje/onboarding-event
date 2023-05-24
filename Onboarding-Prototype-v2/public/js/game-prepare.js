// Send chosen team to server.js
const chosenTeam = 1; // Replace with the chosen team value

fetch('/game-prepare', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ chosenTeam }),
})
  .then(response => {
    if (response.ok) {
      console.log('Chosen team sent successfully');
    } else {
      console.error('Failed to send chosen team');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
