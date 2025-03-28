const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, "students.json");

// Load student data
const loadStudents = () => {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Save student data
const saveStudents = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Serve frontend
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/script.js", (req, res) => res.sendFile(path.join(__dirname, "script.js")));

// API to receive student credentials
app.post("/login", (req, res) => {
    const { registerNumber, subjectCode } = req.body;
    if (!registerNumber || !subjectCode) {
        return res.status(400).json({ message: "Missing credentials" });
    }

    let students = loadStudents();
    let hallNumber = `H-${Math.floor(100 + Math.random() * 900)}`;
    let seatNumber = `S-${Math.floor(10 + Math.random() * 90)}`;

    const studentData = { registerNumber, subjectCode, hallNumber, seatNumber };
    students.push(studentData);
    saveStudents(students);

    res.json({ hallNumber, seatNumber });
});

// API to get student seat details
app.get("/seat/:registerNumber", (req, res) => {
    let students = loadStudents();
    const student = students.find((s) => s.registerNumber === req.params.registerNumber);

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ hallNumber: student.hallNumber, seatNumber: student.seatNumber });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));