const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'notes.json');

// Load notes from JSON
const loadData = () => {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Save notes to JSON
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Serve frontend files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname, 'script.js')));

// API Routes
app.get('/notes', (req, res) => res.json(loadData()));

app.post('/notes', (req, res) => {
    let notes = loadData();
    const newNote = { id: Date.now(), title: req.body.title, content: req.body.content };
    notes.push(newNote);
    saveData(notes);
    res.json(newNote);
});

app.put('/notes/:id', (req, res) => {
    let notes = loadData();
    const index = notes.findIndex(n => n.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Note not found' });

    notes[index] = { ...notes[index], ...req.body };
    saveData(notes);
    res.json(notes[index]);
});

app.delete('/notes/:id', (req, res) => {
    let notes = loadData();
    notes = notes.filter(n => n.id != req.params.id);
    saveData(notes);
    res.json({ message: 'Note deleted' });
});

app.get('/search', (req, res) => {
    const keyword = req.query.q.toLowerCase();
    const notes = loadData().filter(n =>
        n.title.toLowerCase().includes(keyword) ||
        n.content.toLowerCase().includes(keyword)
    );
    res.json(notes);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));