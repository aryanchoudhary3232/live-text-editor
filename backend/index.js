const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "https://live-text-editor-frontend.onrender.com",
    method: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user has been connected", socket.id);

  socket.on("clientText", (data) => {
    console.log(data);
    socket.broadcast.emit("serverData", data);
  });
});

io.on("disconnect", () => {
  console.log("user has been disconnected");
});

const PORT = process.env.PORT || 5174;

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
