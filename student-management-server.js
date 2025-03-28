const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "students.json";

app.use(express.static(__dirname));
app.use(express.json());

const getStudents = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
};

const saveStudents = (students) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
};

app.get("/students", (req, res) => res.json(getStudents()));

app.post("/students", (req, res) => {
    const students = getStudents();
    students.push(req.body);
    saveStudents(students);
    res.json(req.body);
});

app.put("/students/:name", (req, res) => {
    let students = getStudents();
    students = students.map((s) => (s.name === req.params.name ? req.body : s));
    saveStudents(students);
    res.json(req.body);
});

app.delete("/students/:name", (req, res) => {
    let students = getStudents().filter((s) => s.name !== req.params.name);
    saveStudents(students);
    res.json({ message: "Student deleted" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));