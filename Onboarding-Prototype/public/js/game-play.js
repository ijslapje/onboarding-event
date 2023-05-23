// game-play.js

// Function to fetch and update the gallery with images
function fetchImages() {
    fetch('/images')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching images: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Process the fetched images data
        console.log('Fetched Images:', data);
        // Update the gallery with the fetched images
        updateGallery(data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }
  
  const durations = [3, 5]; // Duration of each countdown in seconds (10 seconds for the first loop)
  const cycleCount = 6; // Number of cycles to repeat
  
  // Retrieve the start time and location order from localStorage
  let startTime = localStorage.getItem('formattedStartTime');
  const locationOrder = JSON.parse(localStorage.getItem('teamData'));
  
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
    const currentTime = new Date();
    const currentTimestamp = currentTime.getTime();
    return Math.floor((currentTimestamp - startTimestamp) / 1000);
  }
  
  let currentCycle = 1;
  let currentDurationIndex = 0;
  let elapsedTimeFromPreviousCycles = 0;
  let remainingTime = durations[currentDurationIndex];
  
  // Function to format the time in MM:SS format
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Function to update the timeline with completed cycles
  function updateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    for (let i = 0; i < timelineItems.length; i++) {
      if (i < currentCycle) {
        timelineItems[i].classList.add('completed');
      } else {
        timelineItems[i].classList.remove('completed');
      }
    }
  }
  
  // Function to handle the countdown
  function handleCountdown() {
    const elapsedTotalTime = calculateElapsedTime() + elapsedTimeFromPreviousCycles;
    const currentElapsedTime = elapsedTotalTime % durations.reduce((a, b) => a + b, 0);
  
    remainingTime = durations[currentDurationIndex] - currentElapsedTime;
  
    timerElement.textContent = formatTime(remainingTime);
  
    if (remainingTime === 0) {
      currentCycle++;
      currentDurationIndex = (currentCycle - 1) % durations.length;
      elapsedTimeFromPreviousCycles += durations[currentDurationIndex];
      remainingTime = durations[currentDurationIndex];
  
      updateTimeline();
  
      const currentLocationIndex = (currentCycle - 1) % locationOrder.length;
      locationNameElement.textContent = locationOrder[currentLocationIndex].Name;
      assignmentElement.textContent = locationOrder[currentLocationIndex].Assignment;
      tipsElement.textContent = locationOrder[currentLocationIndex].Tips;
    } else {
      remainingTime--;
    }
  
    setTimeout(handleCountdown, 1000);
  }
  
  // Get the DOM element for the timer
  const timerElement = document.getElementById('timer');
  
  // Start the countdown
  handleCountdown();
  
  // Call the fetchImages function to fetch and update the gallery with images
  fetchImages();
  