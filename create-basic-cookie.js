const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// Route to set a cookie
app.get("/set-cookie", (req, res) => {
    res.cookie("username", "Abhijith M", { maxAge: 60000, httpOnly: true });
    res.send("Cookie has been set!");
});

// Route to read a cookie
app.get("/get-cookie", (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.send(`Stored Cookie: ${username}`);
    } else {
        res.send("No cookie found!");
    }
});

// Route to delete a cookie
app.get("/delete-cookie", (req, res) => {
    res.clearCookie("username");
    res.send("Cookie has been deleted!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));