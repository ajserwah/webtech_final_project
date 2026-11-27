const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Configure ports
const PORT_GAME = process.env.PORT_GAME || 3000;
const PORT_SITES = process.env.PORT_SITES || 3001;

// GAME ORIGIN
const gameApp = express();
const WEB = path.join(__dirname, "..", "web");

// Pages live in web/pages but are served from the root: /play.html, /cases.html
gameApp.use(express.static(path.join(WEB, "pages")));
// CSS and JS: /css/..., /js/...
gameApp.use(express.static(WEB));

// Example API responses, used by api.js when a page is opened with ?fake.
// Development only: never served in production.
if (process.env.NODE_ENV !== "production") {
  gameApp.use("/fixtures", express.static(path.join(__dirname, "..", "fixtures")));
}

const gameServer = http.createServer(gameApp);

// Initialize Socket.io on the game origin
const io = new Server(gameServer);

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
