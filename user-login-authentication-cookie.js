const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = "supersecretkey"; // Use an environment variable in production

// Dummy users (Replace with a database in production)
const users = [{ username: 'admin', password: 'password' }];

// Login Route (Creates a cookie with JWT)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '30m' });

    // Set JWT as an HTTP-only cookie
    res.cookie('authToken', token, {
        httpOnly: true, // Prevents client-side JavaScript access
        secure: false,  // Set to true in production (HTTPS required)
        maxAge: 1000 * 60 * 30 // 30-minute expiration
    });

    res.json({ message: 'Login successful' });
});

// Middleware to verify authentication via cookies
const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded.username;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Protected Profile Route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

// Logout Route (Clears cookie)
app.post('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: 'Logged out' });
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
