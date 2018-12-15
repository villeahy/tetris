function getRandomInt(max) {
  return Math.floor(Math.random() * max).toString();
}
//class for fining opponent/room
export default class {
  constructor(io) {
    this.io = io;
    this.waitingRoom = { makeNew: true };
  }

  leaveLobby(room) {
    if (room === this.waitingRoom.room) this.waitingRoom = { makeNew: true };
  }
  joinGame(socket) {
    // this hideous thing is called Conditional (ternary) operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    // it checks if some is waiting for player you select from new object or waitingroom object
    const room = this.waitingRoom.makeNew
      ? {
          room: getRandomInt(Date.now() * 2),
          players: 1,
          status: "waiting"
        }
      : this.waitingRoom;
    console.log(room.room);
    socket.join(room.room);
    //checks if you are joining room or waiting for another player
    if (this.waitingRoom.makeNew) {
      this.waitingRoom = room;
    } else {
      room.status = "ready";
      this.waitingRoom.players = 2;
      this.waitingRoom = { makeNew: true };
    }
    // this is called with io so socket above will get the emit too
    this.io.to(room.room).emit("gameStatus", room.status);
    return { ...room };
  }
}
