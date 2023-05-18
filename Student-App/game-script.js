// Get the timer element
const timerElement = document.getElementById("timer");

// Set the start time in milliseconds (replace with the actual start time from teacher app data)
const startTime = 1622745600000; // Example: July 4, 2021 00:00:00 UTC

// Update the timer every second
setInterval(updateTimer, 1000);

function updateTimer() {
  // Calculate the time remaining
  const currentTime = Date.now();
  const timeDiff = currentTime - startTime;
  const seconds = Math.floor(timeDiff / 1000) % 60;
  const minutes = Math.floor(timeDiff / 1000 / 60);

  // Format the time as MM:SS
  const formattedTime = `${padNumber(minutes)}:${padNumber(seconds)}`;

  // Update the timer element
  timerElement.textContent = formattedTime;
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}
