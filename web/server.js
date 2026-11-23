const express = require("express");
const path = require("path");

const app = express();

// Serve frontend files
app.use(express.static(__dirname));

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

// Start server on port 3001
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
});