document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const rollNo = document.getElementById('rollNo').value.trim();
    const studentDataDiv = document.getElementById('studentData');
    const studentPhoto = document.getElementById('studentPhoto');
    const studentName = document.getElementById('studentName');
    const studentRollNo = document.getElementById('studentRollNo');
    const studentClass = document.getElementById('studentClass');
    const profileLink = document.getElementById('profileLink');

    console.log('Fetching student data for roll number:', rollNo);

    // Fetch student data from JSON
    fetch('students.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Student data loaded:', data);
            const student = data.find(student => student.rollNo === rollNo);

            if (student) {
                console.log('Student found:', student);
                studentPhoto.src = student.photo || 'images/default.jpg'; // Use default photo if no photo is provided
                studentName.textContent = student.name;
                studentRollNo.textContent = student.rollNo;
                studentClass.textContent = student.class;
                profileLink.href = `profile.html?rollNo=${student.rollNo}`; // Link to profile page
                studentDataDiv.classList.remove('hidden');
            } else {
                console.log('Student not found for roll number:', rollNo);
                alert('Student not found!');
                studentDataDiv.classList.add('hidden');
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            alert('An error occurred while fetching student data. Please check the console for details.');
        });
});