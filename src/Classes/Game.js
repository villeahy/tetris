import blockGenerator from "../helpers/blockGenerator.js";
import emptyBoard from "../helpers/board.js";
export default class {
  constructor(socket) {
    this.socket = socket;
    this.status = "joined";
    this.room;
    this._block = [];
    this._gameBoard = [];
  }

  // tells opponent that your game board changed
  set gameBoard(board) {
    this._gameBoard = board;
  }

  set block(block) {
    this._block;
    const [, room] = Object.keys(this.socket.rooms);
    this.socket.to(room).emit("action", this.renderBoard);
  }

  // remove mutating
  get block() {
    return this._block.map(obj => ({ ...obj }));
  }

  // remove mutating
  get gameBoard() {
    return this._gameBoard.map(arr => [...arr]);
  }

  get renderBoard() {
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

  // Switch case should always end up with setting up block or calling newblock so it will emit actions to opponent
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
      case "Init":
        this.gameBoard = emptyBoard;
        this.newBlock();
        break;
      default:
        console.log("default");
        break;
    }
    //for callback so you will se your own board
    return this.renderBoard;
  }
}
