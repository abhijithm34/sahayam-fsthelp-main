const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = "./attendance.json";

app.use(bodyParser.json());

// Serve static files (frontend)
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/styles.css", (req, res) => res.sendFile(path.join(__dirname, "styles.css")));
app.get("/script.js", (req, res) => res.sendFile(path.join(__dirname, "script.js")));

// Read Attendance Data
const readAttendance = () => {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    } catch (error) {
        return [];
    }
};

// Save Attendance Data
const writeAttendance = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Get attendance data
app.get("/attendance", (req, res) => {
    res.json(readAttendance());
});

// Save attendance data
app.post("/attendance", (req, res) => {
    const attendanceData = req.body;
    writeAttendance(attendanceData);
    res.json({ message: "Attendance saved successfully!" });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
