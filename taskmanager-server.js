const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'tasks.json');

// Load tasks from JSON
const loadData = () => {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Save tasks to JSON
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Serve the frontend files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname, 'script.js')));

// API Routes
app.post('/tasks', (req, res) => {
    let tasks = loadData();
    const newTask = { id: Date.now(), ...req.body, completed: false };
    tasks.push(newTask);
    saveData(tasks);
    res.json(newTask);
});

app.get('/tasks', (req, res) => res.json(loadData()));

app.put('/tasks/:id', (req, res) => {
    let tasks = loadData();
    const index = tasks.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });
    tasks[index] = { ...tasks[index], ...req.body };
    saveData(tasks);
    res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
    let tasks = loadData();
    tasks = tasks.filter(t => t.id != req.params.id);
    saveData(tasks);
    res.json({ message: 'Task deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));