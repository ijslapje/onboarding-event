// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the continue button
  const continueButton = document.getElementById("continueButton");
  let chosenTeam;

  if (continueButton) {
    continueButton.addEventListener("click", function () {
      const teamDropdown = document.getElementById("teamDropdown");
      if (teamDropdown) {
        chosenTeam = teamDropdown.value;

        fetch("/game-prepare", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chosenTeam }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Chosen team sent successfully");
              console.log(chosenTeam);
            } else {
              console.error("Failed to send chosen team");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        //Redirect to game-load.html
        window.location.href = `game-load.html?team=${encodeURIComponent(
          chosenTeam
        )}`;
      } else {
        console.error("Team dropdown element not found.");
      }
    });
  } else {
    console.error("Continue button element not found.");
  }


});
