const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Session setup
app.use(session({
    secret: 'secretkey', 
    resave: false,
    saveUninitialized: false, 
    cookie: {
        httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
        secure: false,   // Set to true in production with HTTPS
        maxAge: 1000 * 60 * 30 // 30-minute session expiration
    }
}));

// Dummy users (In production, use a database)
const users = [{ username: 'admin', password: 'password' }];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = username; // Store user session
        res.cookie('sessionId', req.sessionID, { httpOnly: true }); // Set session ID in cookie
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
    next();
};

// Protected route: Profile
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.session.user });
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Error logging out' });
        res.clearCookie('sessionId'); // Remove session cookie
        res.json({ message: 'Logged out' });
    });
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
