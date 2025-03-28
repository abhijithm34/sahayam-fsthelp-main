const API_URL = "/books";

async function fetchBooks() {
    const response = await fetch(API_URL);
    const books = await response.json();
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>
                <button onclick="editBook(${book.id}, '${book.title}', '${book.author}', ${book.year})">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

async function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    if (!title || !author || !year) {
        alert("All fields are required!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, year })
    });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    fetchBooks();
}

async function deleteBook(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchBooks();
}

function editBook(id, title, author, year) {
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("year").value = year;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.onclick = async () => {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                year: document.getElementById("year").value
            })
        });
        saveButton.remove();
        fetchBooks();
    };

    document.body.appendChild(saveButton);
}

fetchBooks();