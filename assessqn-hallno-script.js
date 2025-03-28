const API_URL = "/login";
const GET_SEAT_URL = "/seat/";

async function login() {
    const registerNumber = document.getElementById("registerNumber").value;
    const subjectCode = document.getElementById("subjectCode").value;

    if (!registerNumber || !subjectCode) {
        alert("Please enter both Register Number and Subject Code.");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registerNumber, subjectCode })
    });

    const data = await response.json();
    document.getElementById("result").innerHTML = response.ok
        ? `Hall Number: ${data.hallNumber}, Seat Number: ${data.seatNumber}`
        : `Error: ${data.message}`;
}

async function getSeat() {
    const registerNumber = document.getElementById("checkRegister").value;

    if (!registerNumber) {
        alert("Please enter a Register Number.");
        return;
    }

    const response = await fetch(GET_SEAT_URL + registerNumber);
    const data = await response.json();

    document.getElementById("seatResult").innerHTML = response.ok
        ? `Hall Number: ${data.hallNumber}, Seat Number: ${data.seatNumber}`
        : `Error: ${data.message}`;
}