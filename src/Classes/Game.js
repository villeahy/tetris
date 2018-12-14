import blockGenerator from "../helpers/blockGenerator.js";
export default class {
  constructor(socket) {
    this.socket = socket;
    this.status = "joined";
    this.room;
    this._block = [
      { i: 0, y: 4 },
      { i: -1, y: 4 },
      { i: 0, y: 5 },
      { i: -1, y: 5 }
    ];
    this._gameBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  // tells opponent that your game board changed
  set gameBoard(board) {
    this._gameBoard = board;
  }

  set block(block) {
    this._block;
    const [, room] = Object.keys(this.socket.rooms);
    this.socket.to(room).emit("action", this.renderBoard());
  }

  // remove mutating
  get block() {
    return this._block.map(obj => ({ ...obj }));
  }

  // remove mutating
  get gameBoard() {
    return this._gameBoard.map(arr => [...arr]);
  }

  renderBoard() {
    const board = this.gameBoard;
    this.block.forEach(obj => {
      if (obj.i >= 0) {
        if (board[obj.y][obj.i] !== 2) {
          board[obj.y][obj.i] = 1;
        }
      }
    });
    return board;
  }

  join({ room, status }) {
    this.status = status;
    this.room = room;
    return status;
  }

  newBlock() {
    this.block = blockGenerator(Math.floor(Math.random() * 7));
  }

  move({ type }) {
    switch (type) {
      case "ArrowLeft":
        console.log("arrowLeft");
        break;
      case "ArrowRight":
        console.log("arrowRight");
        break;
      case "ArrowDown":
        console.log("arrowDown");
        break;
      default:
        console.log("default");
        break;
    }
  }
}
