import express from "express";
import { Server } from "http";
import socketIO from "socket.io";
import { createStore } from "redux";
import { addEventListeners } from "./helpers/";

const app = express();
const server = Server(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// showing waiting room for testing
app.get("/", async (req, res) => {
  res.json("waitingRoom.getState()");
});

io.on("connection", addEventListeners);
