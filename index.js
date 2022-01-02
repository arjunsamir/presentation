// Require the modules
require('dotenv').config({ path: './config.env' });
const app = require("./server/app");

// Create Server
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Manage Socket IO Connection
io.on("connection", require("./server/socketController")(io));

// Get Port
const port = process.env.PORT || 5000;

// Fire Up Server
server.listen(port, () => console.log(`App is running on port ${port} 👍`))