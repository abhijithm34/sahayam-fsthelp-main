document.addEventListener("DOMContentLoaded", loadAttendance);

const students = ["John Doe", "Jane Smith", "Michael Brown"];

function loadAttendance() {
    fetch("/attendance")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("attendanceBody");
            tableBody.innerHTML = "";
            students.forEach((name, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${name}</td>
                    <td><input type="checkbox" ${data[index]?.attendance[0] === "Present" ? "checked" : ""}></td>
                    <td><input type="checkbox" ${data[index]?.attendance[1] === "Present" ? "checked" : ""}></td>
                    <td><input type="checkbox" ${data[index]?.attendance[2] === "Present" ? "checked" : ""}></td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function saveAttendance() {
    const rows = document.querySelectorAll("#attendanceBody tr");
    let attendanceData = [];

    rows.forEach(row => {
        let name = row.cells[0].innerText;
        let attendance = [];
        for (let i = 1; i < row.cells.length; i++) {
            attendance.push(row.cells[i].children[0].checked ? "Present" : "Absent");
        }
        attendanceData.push({ name, attendance });
    });

    fetch("/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData)
    }).then(() => alert("Attendance Saved!"));
}
