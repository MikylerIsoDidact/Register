// JavaScript for attendance functionality
document.addEventListener('DOMContentLoaded', () => {
    const students = [
        { name: "Michael", surname: "Hlongwane", student_no: "2024001" },
        { name: "Jane", surname: "Doe", student_no: "2024002" },
        { name: "John", surname: "Smith", student_no: "2024003" }
    ];

    document.getElementById('fetchDetails').addEventListener('click', () => {
        const studentNo = document.getElementById('studentNo').value;
        const student = students.find(s => s.student_no === studentNo);

        if (!student) {
            alert('Student not found');
            return;
        }

        document.getElementById('name').textContent = student.name;
        document.getElementById('surname').textContent = student.surname;
        document.getElementById('studentNoDisplay').textContent = student.student_no;

        document.getElementById('studentInfo').style.display = 'block';
    });

    document.getElementById('attendanceForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const studentNo = document.getElementById('studentNo').value;
        const initials = document.getElementById('initials').value;
        const module = document.getElementById('module').value;
        const moduleCode = document.getElementById('moduleCode').value;

        if (!initials) {
            alert('Please provide your initials');
            return;
        }

        const payload = { student_no: studentNo, initials, module, moduleCode };
        console.log('Submitting:', payload);

        fetch('attendance_register.xlsx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
        })
        .catch(err => {
            console.error('Error:', err);
        });
    });
});
