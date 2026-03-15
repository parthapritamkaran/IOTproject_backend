require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

const gpsRoutes = require("./routes/gpsRoutes");
console.log("gpsRoutes imported in server.js");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

app.set("io", io);

console.log("Mounting /api routes...");
app.use("/api", gpsRoutes);

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
}); 