// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the chosen team from local storage
  const chosenTeam = localStorage.getItem('chosenTeam');
  console.log('Chosen Team:', chosenTeam);

  // Retrieve the teacherAppData from localStorage
  const teacherAppData = JSON.parse(localStorage.getItem('teacherAppData'));

  console.log(teacherAppData); // Check if the data is correctly retrieved

  // Extract the relevant data from teacherAppData
  const { teamData, startTime } = teacherAppData;
  const teamIndex = parseInt(chosenTeam.replace('team', '')) - 1;

  // Find the corresponding team in teamData based on the team index
  const selectedTeam = teamData[teamIndex];

  console.log(selectedTeam); // Check if the correct team is found

  // Store the startTime in localStorage
  localStorage.setItem('startTime', startTime);

  // Hide the loading container and show the continue container after 5 seconds
  setTimeout(function () {
    const loadingContainer = document.getElementById('loadingContainer');
    const continueContainer = document.getElementById('continueContainer');

    loadingContainer.classList.add('hidden');
    continueContainer.classList.remove('hidden');

    // Add click event listener to the continue button
    const continueButton = document.getElementById('continueButton');
    continueButton.addEventListener('click', function () {
      // Navigate to the next page
      window.location.href = 'game.html';
    });
  }, 2000);
});
