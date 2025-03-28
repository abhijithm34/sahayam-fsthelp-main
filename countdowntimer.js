let count = 10;
const interval = setInterval(() => {
    console.log(count);
    if (count-- === 0) clearInterval(interval);
}, 1000);
