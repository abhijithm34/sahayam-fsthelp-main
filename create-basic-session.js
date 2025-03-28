const express = require("express");
const session = require("express-session");

const app = express();

// Middleware to initialize session
app.use(
    session({
        secret: "my_secret_key", // Secret key for signing the session ID
        resave: false, // Prevents resaving unchanged sessions
        saveUninitialized: true, // Saves new but unmodified sessions
        cookie: { maxAge: 60000 }, // Session expires in 60 seconds
    })
);

// Route to set a session
app.get("/set-session", (req, res) => {
    req.session.username = "Abhijith M";
    res.send("Session has been set!");
});

// Route to read the session
app.get("/get-session", (req, res) => {
    if (req.session.username) {
        res.send(`Stored Session: ${req.session.username}`);
    } else {
        res.send("No session found!");
    }
});

// Route to destroy the session
app.get("/destroy-session", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Error destroying session");
        }
        res.send("Session has been destroyed!");
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));