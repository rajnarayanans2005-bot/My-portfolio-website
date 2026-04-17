const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.get("/", (req, res) => {
    res.send("Backend is running successfully 🚀");
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://rajnarayanans2005_db_user:YOUR_PASSWORD@mycluster.9pdhbzx.mongodb.net/portfolioDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Message", messageSchema);

// Visitor Count
let visitorCount = 0;

app.get("/visit", (req, res) => {
    visitorCount++;
    res.json({ count: visitorCount });
});

// Save Feedback
app.post("/feedback", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();

        res.json({ message: "Message saved in database!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save message" });
    }
});

// Get Feedback
app.get("/feedback", async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});


// LOGIN ROUTE
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    console.log("USERNAME =", username);
    console.log("PASSWORD =", password);

    if (username === "admin" && password === "1234") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});
// Delete one message
app.delete("/feedback/:id", async (req, res) => {
    try {
        console.log("DELETE ID =", req.params.id);

        await Message.findByIdAndDelete(req.params.id.trim());

        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        console.log("DELETE ERROR =", error);
        res.status(500).json({ error: "Delete failed" });
    }
});
console.log("DELETE ROUTE REGISTERED");
console.log("GET /feedback route registered");
console.log("DELETE /feedback/:id route registered");
// Start Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});