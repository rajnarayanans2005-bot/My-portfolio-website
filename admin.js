// Protect admin page
let allMessages = [];

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Load visitor count
async function loadVisitors() {
    try {
        const response = await fetch("https://my-portfolio-website-2-y6lb.onrender.com/visit");
        const data = await response.json();

        document.getElementById("adminVisitors").innerText = data.count;
    } catch (error) {
        console.log("Visitor error:", error);
    }
}

// Load messages
async function loadMessages() {
    try {
        const response = await fetch("https://my-portfolio-website-2-y6lb.onrender.com/feedback");
        allMessages = await response.json();

        console.log("MESSAGES RECEIVED =", allMessages);

        displayMessages(allMessages);
    } catch (error) {
        console.log("ERROR =", error);
    }
}

// Display messages
function displayMessages(messages) {
    let output = "";

    if (!Array.isArray(messages) || messages.length === 0) {
        output = "<p>No messages found</p>";
    } else {
        messages.forEach((msg, index) => {
            output += `
                <div class="message-card">
                    <h3>Message ${index + 1}</h3>
                    <p><strong>Name:</strong> ${msg.name}</p>
                    <p><strong>Email:</strong> ${msg.email}</p>
                    <p><strong>Message:</strong> ${msg.message}</p>
                    <p><strong>Date:</strong> ${new Date(msg.createdAt).toLocaleString()}</p>
                    <button onclick="deleteMessage('${msg._id}')">Delete</button>
                </div>
            `;
        });
    }

    document.getElementById("messages").innerHTML = output;
}

// ✅ DELETE MESSAGE (your code — correct place)
async function deleteMessage(id) {
    console.log("Deleting ID =", id);

    try {
        const response = await fetch(`https://my-portfolio-website-2-y6lb.onrender.com/feedback/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        console.log("DELETE RESPONSE =", result);

        loadMessages(); // refresh
    } catch (error) {
        console.log("DELETE ERROR =", error);
    }
}

// Search filter
function filterMessages() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    const filtered = allMessages.filter(msg =>
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query)
    );

    displayMessages(filtered);
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
});

// Run
loadVisitors();
loadMessages();