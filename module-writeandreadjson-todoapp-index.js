const { addTask, getTasks } = require('./tasks');
const { saveTasks, loadTasks } = require('./storage');

let tasks = loadTasks();
tasks.forEach(addTask);

addTask("Finish Node.js project");
saveTasks(getTasks());

console.log(getTasks());
