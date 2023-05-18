// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the chosen team from local storage
  const chosenTeam = localStorage.getItem('chosenTeam');
  console.log('Chosen Team:', chosenTeam);

  // Retrieve the teacherAppData from localStorage
  const teacherAppData = JSON.parse(localStorage.getItem('teacherAppData'));

  console.log(teacherAppData); // Check if the data is correctly retrieved

  // Extract the relevant data from teacherAppData
  const { teamData } = teacherAppData;
  const teamIndex = parseInt(chosenTeam.replace('team', '')) - 1;

  // Find the corresponding team in teamData based on the team index
  const selectedTeam = teamData[teamIndex];

  console.log(selectedTeam); // Check if the correct team is found

  // You can now use the selectedTeam variable in the rest of your code

  // ...
});
