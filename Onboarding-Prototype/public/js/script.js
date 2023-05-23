document.addEventListener('DOMContentLoaded', function() {
    var teacherButton = document.getElementById('teacherButton');
    var passwordPopup = document.getElementById('passwordPopup');
    var passwordInput = document.getElementById('passwordInput');
    var passwordSubmit = document.getElementById('passwordSubmit');
  
    teacherButton.addEventListener('click', function(event) {
      event.preventDefault();
      passwordPopup.style.display = 'block';
    });
  
    passwordSubmit.addEventListener('click', function() {
      var password = passwordInput.value;
      if (password === '1234') {
        window.location.href = 'admin.html';
      } else {
        alert('Incorrect password. Please try again.');
      }
    });
  });
  