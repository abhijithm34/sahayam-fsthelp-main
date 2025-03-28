const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

const users = [{ username: 'admin', password: 'password' }];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = username;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/profile', (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    res.json({ user: req.session.user });
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});

app.listen(3000, () => console.log('Server running on port 3000'));