const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'books.json');

// Load books from JSON
const loadData = () => {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Save books to JSON
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Serve the frontend files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname, 'script.js')));

// API Routes
app.post('/books', (req, res) => {
    let books = loadData();
    const newBook = { id: Date.now(), ...req.body };
    books.push(newBook);
    saveData(books);
    res.json(newBook);
});

app.get('/books', (req, res) => res.json(loadData()));

app.put('/books/:id', (req, res) => {
    let books = loadData();
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    books[index] = { ...books[index], ...req.body };
    saveData(books);
    res.json(books[index]);
});

app.delete('/books/:id', (req, res) => {
    let books = loadData();
    books = books.filter(b => b.id != req.params.id);
    saveData(books);
    res.json({ message: 'Book deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));