const { getCurrentTime } = require('./dateTime');

setInterval(() => {
    console.log("Current Time:", getCurrentTime());
}, 1000);
