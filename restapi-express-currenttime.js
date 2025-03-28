const express = require('express');
const app = express();

app.get('/time', (req, res) => {
    res.json({ time: new Date().toISOString() });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});