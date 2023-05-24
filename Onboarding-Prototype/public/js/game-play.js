const durations = [3, 5]; // Duration of each countdown in seconds (10 seconds for the first loop)
const cycleCount = 6; // Number of cycles to repeat

// Retrieve the start time and location order from localStorage
let startTime = localStorage.getItem('formattedStartTime');
const locationOrder = JSON.parse(localStorage.getItem('teamData')).Locaties;

// Get the DOM elements for the location name, assignment, and tips
const locationNameElement = document.getElementById('locationName');
const assignmentElement = document.getElementById('assignment');
const tipsElement = document.getElementById('tips');

// Set the initial values from locationOrder[0]
locationNameElement.textContent = locationOrder[0].Name;
assignmentElement.textContent = locationOrder[0].Assignment;
tipsElement.textContent = locationOrder[0].Tips;

// Check if the start time is already set in localStorage
if (!startTime) {
  // If the start time is not set, use the current time as the start time
  const currentTime = new Date();
  startTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

  // Store the start time in localStorage
  localStorage.setItem('startTime', startTime);
}

console.log('startTime:', startTime);
console.log('locationOrder:', locationOrder);

// Parse the startTime string
const [hours, minutes, seconds] = startTime.split(':');

// Create a new Date object with the current date and the parsed time components
const startTimeDate = new Date();
startTimeDate.setHours(hours);
startTimeDate.setMinutes(minutes);
startTimeDate.setSeconds(seconds);

// Get the start time in milliseconds
const startTimestamp = startTimeDate.getTime();

// Function to calculate the elapsed time since the start time
function calculateElapsedTime() {
  const currentTime = new Date().getTime();
  return Math.floor((currentTime - startTimestamp) / 1000); // Convert to seconds
}

// Function to format the time in mm:ss format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Get the DOM elements for the timer and timeline items
const timerElement = document.getElementById('timer');
const timelineItems = document.querySelectorAll('.timeline-item');

let currentCycle = 1;
let currentDurationIndex = 0;
let elapsedTimeFromPreviousCycles = 0;
let remainingTime = durations[currentDurationIndex];

// Function to update the active timeline item
function updateTimeline() {
  // Remove the "active" class from all timeline items
  timelineItems.forEach((item) => {
    item.classList.remove('active');
  });

  // Add the "active" class to the corresponding timeline item
  timelineItems[(currentCycle - 1) % timelineItems.length]?.classList.add('active');
}

// Function to handle the countdown
function handleCountdown() {
  // Update the timer element with the formatted time
  timerElement.textContent = formatTime(remainingTime);

  // Decrease the remaining time by 1 second
  remainingTime--;

  // Check if the countdown timer has reached 0
  if (remainingTime <= 0) {
    // Move to the next duration in the cycle
    currentDurationIndex = (currentDurationIndex + 1) % durations.length;

    if (currentDurationIndex === 0) {
      // Reached the end of the current cycle, increment the cycle count
      currentCycle++;
      updateTimeline(); // Update the active timeline item
      console.log('Current Cycle:', currentCycle);

      if (currentCycle > cycleCount) {
        // Reached the end of the cycles, stop the countdown
        clearInterval(countdownInterval);
        console.log('End of cycles');
        return;
      }

      // Update location name, assignment, and tips based on the current cycle
      const locationIndex = currentCycle - 1;
      const currentLocation = locationOrder[locationIndex];

      locationNameElement.textContent = currentLocation.Name;
      assignmentElement.textContent = currentLocation.Assignment;
      tipsElement.textContent = currentLocation.Tips;
    }

    // Set the remaining time for the next duration
    remainingTime = durations[currentDurationIndex];
  }
}

// Initial update of the timeline and timer
updateTimeline();
handleCountdown();

// Start the interval to update the countdown
const countdownInterval = setInterval(handleCountdown, 1000);
