const EventEmitter = require('events');
const emitter = new EventEmitter();
let count = 0;

emitter.on('increment', () => {
    count++;
    console.log("Count:", count);
});

setInterval(() => emitter.emit('increment'), 1000);
