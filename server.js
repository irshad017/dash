// server.js
const io = require("socket.io")(3000, {
    cors: {
      origin: "*",  // Allow CORS for development
    },
});

// Emit random data every 2 seconds
setInterval(() => {
    const data = {
        value: Math.floor(Math.random() * 100),  // Random number for chart data
        time: new Date().toLocaleTimeString(),   // Current time as label
    };
    io.emit("data", data);  // Emit data event to connected clients
}, 2000);  // Emit data every 2 seconds
