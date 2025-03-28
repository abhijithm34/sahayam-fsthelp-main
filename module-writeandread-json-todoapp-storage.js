const fs = require('fs');

function saveTasks(tasks) {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}

function loadTasks() {
    return fs.existsSync('tasks.json') ? JSON.parse(fs.readFileSync('tasks.json')) : [];
}

module.exports = { saveTasks, loadTasks };
