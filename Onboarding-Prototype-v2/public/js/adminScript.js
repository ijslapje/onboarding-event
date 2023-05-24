function getCurrentTimeInFormat() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

document.getElementById('confirmButton').addEventListener('click', () => {
  const startTime = getCurrentTimeInFormat();

  fetch('/adminScript', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ startTime }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Start time sent successfully');
      } else {
        console.error('Failed to send start time');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  console.log(startTime);
});
