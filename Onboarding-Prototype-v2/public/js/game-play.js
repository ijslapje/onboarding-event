let startTime = '';
let teamData = {};
let currentTeamIndex = 0;
//let countdownDuration = [5 * 60, 10 * 60];
let countdownDuration = [5 * 60, 10 * 60];

/**
 * Starts a countdown timer.
 *
 * @param {number} duration - The duration of the countdown in seconds.
 * @param {Function} onFinish - The callback function to execute when the countdown finishes.
 */
function startCountdown(duration, onFinish) {
  let timer = duration;
  const timerElement = document.getElementById('timer');

  /**
   * Updates the timer element with the remaining time.
   */
  const countdownInterval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (--timer < 0) {
      clearInterval(countdownInterval);
      console.log('Countdown finished');
      onFinish();
    }
  }, 1000);
}


/**
 * Updates HTML elements with team data.
 */
function updateTeamData() {
  const locationNameElement = document.getElementById('locationName');
  const assignmentElement = document.getElementById('assignment');
  const tipsElement = document.getElementById('tips');

  const locations = Object.keys(teamData);
  const location = locations[currentTeamIndex % locations.length];
  const locationInfo = teamData[location][currentTeamIndex % teamData[location].length];

  console.log('Location info:', locationInfo);

  /**
   * Updates the location name element with the team's location name.
   *
   * @param {string} locationInfo.Name - The name of the location.
   */
  locationNameElement.textContent = locationInfo.Name;

  /**
   * Updates the assignment element with the team's assignment.
   *
   * @param {string} locationInfo.Assignment - The assignment description.
   */
  assignmentElement.textContent = locationInfo.Assignment;

  /**
   * Updates the tips element with the team's tips.
   *
   * @param {string} locationInfo.Tips - The tips for the team.
   */
  tipsElement.textContent = locationInfo.Tips;

  currentTeamIndex++;
}


/**
 * Cycles through the timeline items and manages the countdowns.
 */
function cycle() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  let currentIndex = 0;

  /**
   * Updates the active timeline item and team data.
   */
  function updateTimeline() {
    /**
     * Removes the "active" class from all timeline items.
     *
     * @param {Element} item - The timeline item element.
     */
    timelineItems.forEach((item) => {
      item.classList.remove('active');
    });

    /**
     * Adds the "active" class to the corresponding timeline item.
     *
     * @param {Element} currentItem - The current timeline item element.
     */
    const currentItem = timelineItems[currentIndex];
    currentItem.classList.add('active');
    console.log('Current Timeline Item:', currentItem.textContent);

    if (currentItem.textContent > 1) {
      // Update team data
      updateTeamData();
    }
  }

  /**
   * Starts the cycling process by initiating countdowns.
   */
  function startCycling() {
    // Start the first countdown
    console.log('Countdown started');

    /**
     * Callback function to execute when the first countdown finishes.
     */
    startCountdown(countdownDuration[0], () => {
      console.log('First countdown finished');

      // Wait for a duration (e.g., 2 seconds) before starting the second countdown
      setTimeout(() => {
        console.log('Second countdown finished');

        /**
         * Callback function to execute when the second countdown finishes.
         */
        startCountdown(countdownDuration[1], () => {
          console.log('Second countdown finished');
          currentIndex++;

          if (currentIndex < timelineItems.length) {
            updateTimeline();
            startCycling();
          } else {
            console.log('End of cycles');
          }
        });
      });
    });
  }

  startCycling();
}

/**
 * Uploads an image file.
 *
 * @function uploadImage
 */
function uploadImage() {
  /**
   * Represents the selected file to upload.
   *
   * @type {File}
   */
  const file = this.files[0];

  if (file) {
    /**
     * Represents the upload button element.
     *
     * @type {HTMLElement}
     */
    const uploadButton = document.getElementById('uploadButton');

    /**
     * Represents the form data for the image upload.
     *
     * @type {FormData}
     */
    const formData = new FormData();
    formData.append('image', file);

    /**
     * Represents the XMLHttpRequest object for making the upload request.
     *
     * @type {XMLHttpRequest}
     */
    const request = new XMLHttpRequest();
    request.open('POST', '/upload-image');
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          uploadButton.textContent = 'Uploaded!';
          uploadButton.style.backgroundColor = 'green';

          setTimeout(function() {
            uploadButton.textContent = 'Upload';
            uploadButton.style.backgroundColor = '#777777';
          }, 2000);

          // Do any additional processing or UI updates here
        } else {
          // Handle the upload failure or display an error message
        }
      }
    };

    request.send(formData);
  }
}

/**
 * Event listener for the change event of the file input.
 *
 * @callback ChangeEventListener
 * @param {Event} event - The change event object.
 */

/**
 * Adds an event listener to the file input to trigger the {@link uploadImage} function when a file is selected.
 *
 * @function addEventListener
 * @param {string} type - The event type ("change" in this case).
 * @param {ChangeEventListener} listener - The callback function to execute when the event is triggered.
 */
document.getElementById('imageInput').addEventListener('change', uploadImage);

/**
 * Get startTime for the countdown from server.js.
 * Fetches the start time from the '/game-play' endpoint, initializes the countdown,
 * and handles the response to start the game or display an error message.
 *
 * @returns {Promise} - A promise representing the asynchronous fetching of the start time.
 */
fetch('/game-play')
  .then(response => response.json())
  .then(data => {
    /**
     * The start time retrieved from the server.
     * @type {string}
     */
    startTime = data.startTime;
    console.log('startTime:', startTime);

    const [hours, minutes, seconds] = startTime.split(':');
    const startTimestamp = new Date();
    startTimestamp.setHours(hours);
    startTimestamp.setMinutes(minutes);
    startTimestamp.setSeconds(seconds);
    const currentTime = new Date();
    const duration = Math.floor((startTimestamp - currentTime) / 1000);

    if (duration > 0) {
      console.log('Countdown will start in', duration, 'seconds');

      /**
       * Callback function to execute when the countdown finishes.
       *
       * @callback CountdownFinishCallback
       */
      startCountdown(duration, () => {
        console.log('Countdown finished');

        fetch('/game-load')
          .then(response => response.json())
          .then(data => {
            /**
             * The team data received from the server.
             * @type {object}
             */
            teamData = data;
            console.log('teamData:', teamData);
            updateTeamData();
            cycle();
          })
          .catch(error => {
            /**
             * An error occurred while fetching the team data.
             * @type {Error}
             */
            console.error('Error:', error);
          });
      });
    } else {
      console.log('Countdown started');

      fetch('/game-load')
        .then(response => response.json())
        .then(data => {
          /**
           * The team data received from the server.
           * @type {object}
           */
          teamData = data;
          console.log('teamData:', teamData);
          updateTeamData();
          cycle();
        })
        .catch(error => {
          /**
           * An error occurred while fetching the team data.
           * @type {Error}
           */
          console.error('Error:', error);
        });
    }
  })
  .catch(error => {
    /**
     * An error occurred while fetching the start time.
     * @type {Error}
     */
    console.error('Error:', error);
  });

/**
 * Send and upload Photo/Video to 'files' using server.js.
 * Adds an event listener to the file input element and handles the file upload request.
 */
const fileInput = document.getElementById('imageInput');
if (fileInput) {
  fileInput.addEventListener('change', () => {
    /**
     * The selected file for upload.
     * @type {File}
     */
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload-image', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          /**
           * An error occurred while uploading the file.
           * @type {Error}
           */
          console.error('Failed to upload file');
        }
      })
      .catch(error => {
        /**
         * An error occurred during the file upload process.
         * @type {Error}
         */
        console.error('Error:', error);
      });
  });
}

