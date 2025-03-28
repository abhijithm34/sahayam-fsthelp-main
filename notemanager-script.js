const API_URL = "/notes";

async function fetchNotes() {
    const response = await fetch(API_URL);
    const notes = await response.json();
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = notes.map(note => `
        <tr>
            <td>${note.title}</td>
            <td>${note.content}</td>
            <td>
                <button onclick="editNote(${note.id})">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

async function addNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Both title and content are required!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    fetchNotes();
}

async function editNote(id) {
    const newTitle = prompt("Enter new title:");
    const newContent = prompt("Enter new content:");

    if (newTitle && newContent) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle, content: newContent })
        });
        fetchNotes();
    }
}

async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
}

async function searchNotes() {
    const query = document.getElementById("search").value;
    const response = await fetch(`/search?q=${query}`);
    const notes = await response.json();
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = notes.map(note => `
        <tr>
            <td>${note.title}</td>
            <td>${note.content}</td>
            <td>
                <button onclick="editNote(${note.id})">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

fetchNotes();