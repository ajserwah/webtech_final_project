
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Configure ports
const PORT_GAME = process.env.PORT_GAME || 3000;
const PORT_SITES = process.env.PORT_SITES || 3001;

// GAME ORIGIN
const gameApp = express();
gameApp.use(express.static(path.join(__dirname, "..", "web")));

const gameServer = http.createServer(gameApp);

// Initialize Socket.io on the game origin
const io = new Server(gameServer);

// Serve the game homepage
gameApp.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "web", "pages", "index.html")
  );
});

// SITES ORIGIN
const sitesApp = express();

// Placeholder case page
sitesApp.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Case Closed - Case Site</title>
      </head>
      <body>
        <h1>Case Closed</h1>
        <p>Placeholder case website is running.</p>
      </body>
    </html>
  `);
});

// Start both origins
gameServer.listen(PORT_GAME, () => {
  console.log(`Game origin running on port ${PORT_GAME}`);
});

const sitesServer = sitesApp.listen(PORT_SITES, () => {
  console.log(`Sites origin running on port ${PORT_SITES}`);
});
