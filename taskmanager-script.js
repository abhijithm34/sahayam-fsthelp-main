const API_URL = "/tasks";

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = tasks.map(task => `
        <tr>
            <td>${task.description}</td>
            <td>${task.completed ? "✅ Completed" : "❌ Not Completed"}</td>
            <td>
                <button onclick="toggleTask(${task.id}, ${task.completed})">
                    ${task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

async function addTask() {
    const description = document.getElementById("task").value;

    if (!description) {
        alert("Task description is required!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description })
    });

    document.getElementById("task").value = "";
    fetchTasks();
}

async function toggleTask(id, currentStatus) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

fetchTasks();