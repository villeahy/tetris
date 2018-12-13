function getRandomInt(max) {
  return Math.random() * max;
}

export default class {
  constructor(io) {
    this.io = io;
    this.rooms = [];
  }
  joinGame(socket) {
    const room =
      this.rooms.filter(game => game.players === 1).length === 0
        ? {
            room: getRandomInt(Date.now() * 2),
            players: 0,
            status: "waiting"
          }
        : this.rooms.filter(game => game.players === 1)[0];
    room.players++;
    socket.join(room.room);
    switch (room.players) {
      case 1:
        this.rooms.push(room);
        break;
      case 2:
        room.status = "ready";
        break;
      default:
        console.log("this should never run Classes/Room.js joinGame");
    }
    this.io.to(room.room).emit("gameStatus", room.status);
    return room.status;
  }
  leave(room, socket) {
    this.rooms = this.rooms.filter(obj => obj.room !== room);
    socket.leave(room);
  }
}
