const EventEmitter = require('events');
const chat = new EventEmitter();

chat.on('message', (user, msg) => {
    console.log(`${user}: ${msg}`);
});

chat.emit('message', 'Alice', 'Hello!');
chat.emit('message', 'Bob', 'Hey there!');
