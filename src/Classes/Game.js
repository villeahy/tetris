import {
  emptyBoard,
  blockGenerator,
  checkLines,
  turnBlock
} from "../helpers/index.js";

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
    this._block = block;
    const [, room] = Object.keys(this.socket.rooms);
    this.socket.to(room).emit("action", this.renderBoard);
  }

  // remove mutating
  get block() {
    return {
      ...this._block,
      coords: this._block.coords.map(obj => ({ ...obj }))
    };
  }

  // remove mutating
  get gameBoard() {
    return this._gameBoard.map(arr => [...arr]);
  }

  get renderBoard() {
    const board = this.gameBoard;
    this.block.coords.forEach(obj => {
      if (obj.i >= 0) {
        if (board[obj.y][obj.i] !== 2) {
          board[obj.y][obj.i] = this.block.value;
        }
      }
    });
    return board;
  }

  join({ room, status }) {
    if (this.room) {
      const [, room] = Object.keys(this.socket.rooms);
      this.socket.leave(room);
    }
    this.status = status;
    this.room = room;
    return status;
  }

  // Switch case should always end up with setting up block or calling newblock so it will emit actions to opponent
  move({ type }) {
    switch (type) {
      case "ArrowLeft":
        console.log("left");
        this.moveSide(-1);
        break;
      case "ArrowRight":
        console.log("right");
        this.moveSide(1);
        break;
      case "ArrowDown":
        console.log("arrowDown");
        this.moveDown();
        break;
      case "ArrowUp":
        this.block = turnBlock(this.block);
        break;
      case "Init":
        this.gameBoard = emptyBoard;
        this.newBlock();
        break;
      default:
        console.log("default at Game.js");
        break;
    }
    //for callback so you will se your own board
    return this.renderBoard;
  }

  //////////////////////////////////////////////////
  // Tetris logic//////////////////////////////////

  newBlock() {
    this.block = blockGenerator(Math.floor(Math.random() * 7));
  }

  setValues() {
    this.block.coords.forEach(obj => {
      this._gameBoard[obj.y][obj.i] = this.block.value;
    });
  }

  // this has to end with setting a block
  moveDown() {
    // checks if you can go down or have to set block and check lines
    if (
      this.block.coords.reduce((acc, obj) => {
        if (obj.i < 0) return acc;
        if (
          this.gameBoard[obj.y][obj.i + 1] > 0 ||
          this.gameBoard[obj.y][obj.i + 1] === undefined
        )
          return 1;
        return acc;
      }, 2) === 1
    ) {
      this.setValues();
      this.gameBoard = checkLines({
        gameBoard: this.gameBoard
      });
      this.newBlock();
    } else {
      this.block = {
        ...this.block,
        coords: this.block.coords.map(obj => ({ ...obj, i: obj.i + 1 }))
      };
    }
  }

  moveSide(value) {
    // figre out which side you are going
    const side = value === -1 ? 0 : this.gameBoard.length - 1;
    // chekcs if you can move side if not returns so function will be interupted
    if (
      this.block.coords.reduce((acc, obj) => {
        if (obj.y === side) return true;
        if (this.gameBoard[obj.y + value][obj.i] > 0) return true;
        return acc;
      }, false)
    ) {
      return;
    }
    this.block = {
      ...this.block,
      coords: this.block.coords.map(obj => ({ ...obj, y: obj.y + value }))
    };
  }
}
