document.addEventListener('DOMContentLoaded', function () {
    // Check if teacherAppData is defined
    if (window.teacherAppData) {
      // Access the teacherAppData variable from the teacher app
      console.log(window.teacherAppData);
    } else {
      // Wait for teacherAppData to be defined
      window.addEventListener('teacherAppDataDefined', function () {
        // Access the teacherAppData variable from the teacher app
        console.log(window.teacherAppData);
      });
    }
  });
  