import {
  emptyBoard,
  blockGenerator,
  checkLines,
  turnBlock,
  checkDown
} from "../helpers/index.js";

export default class {
  constructor(socket) {
    this.socket = socket;
    this.status = "joined";
    this.streak = 0;
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
    this.socket.to(room).emit("action", { opponentBoard: this.renderBoard });
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
    const block = this.block;

    while (!block.coords.reduce(checkDown(this.gameBoard), false)) {
      for (var i = 0; i < block.coords.length; i++) {
        block.coords[i].row++;
      }
    }
    block.coords.forEach(obj => {
      if (obj.row >= 0) {
        board[obj.column][obj.row] = 10;
      }
    });

    this.block.coords.forEach(obj => {
      if (obj.row >= 0) {
        board[obj.column][obj.row] = this.block.value;
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
  action({ type }) {
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
        console.log("arrowup");
        this.block = turnBlock(this.block, this.gameBoard);
        break;
      case "Space":
        console.log("space");
        this.jumpDown();
        break;
      case "Init":
        console.log("init");
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
  // Tetris logic//////////////////////////////////Math.floor(Math.random() * 7)

  newBlock() {
    this.block = blockGenerator(Math.floor(Math.random() * 7));
  }

  setValues() {
    this.block.coords.forEach(obj => {
      this._gameBoard[obj.column][obj.row] = this.block.value;
    });
  }

  // this has to end with setting a block
  moveDown() {
    // checks if you can go down or have to set block and check lines
    if (this.block.coords.reduce(checkDown(this.gameBoard), false)) {
      this.setValues();
      const checked = checkLines(this.block, this.gameBoard);
      this.gameBoard = checked.gameBoard;
      if (this.streak) {
        if (checked.cleared) {
          this.streak = this.streak + checked.cleared;
        } else {
          this.streak = 0;
        }
      } else {
        if (checked.cleared > 1) {
          this.streak = checked.cleared - 1;
        }
      }
      console.log(this.streak);
      this.newBlock();
    } else {
      this.block = {
        ...this.block,
        coords: this.block.coords.map(obj => ({ ...obj, row: obj.row + 1 }))
      };
    }
  }

  jumpDown() {
    let block = this.block;
    const board = this.gameBoard;

    while (!block.coords.reduce(checkDown(this.gameBoard), false)) {
      block = {
        ...block,
        coords: block.coords.map(obj => ({ ...obj, row: obj.row + 1 }))
      };
    }

    block.coords.forEach(obj => {
      board[obj.column][obj.row] = block.value;
    });
    this.gameBoard = board;
    this.newBlock();
  }

  moveSide(value) {
    // figre out which side you are going
    const side = value === -1 ? 0 : this.gameBoard.length - 1;
    // chekcs if you can move side if not returns so function will be interupted
    if (
      this.block.coords.reduce((acc, obj) => {
        if (obj.column === side) return true;
        if (this.gameBoard[obj.column + value][obj.row] > 0) return true;
        return acc;
      }, false)
    ) {
      return;
    }
    this.block = {
      ...this.block,
      coords: this.block.coords.map(obj => ({
        ...obj,
        column: obj.column + value
      }))
    };
  }
}
