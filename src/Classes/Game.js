import {
  emptyBoard,
  blockGenerator,
  turnBlock,
  checkDown,
  moveDown,
  moveSide
} from "../helpers/index.js";

export default class {
  constructor() {
    this.status = "joined";
    this.streak = 0;
    this._block = [];
    this._gameBoard = [];
  }

  set gameBoard(board) {
    this._gameBoard = board;
  }

  set block(block) {
    this._block = block;
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
    // adding ghost to board
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

    //adding current block to rendered board
    this.block.coords.forEach(obj => {
      if (obj.row >= 0) {
        board[obj.column][obj.row] = this.block.value;
      }
    });
    return board;
  }

  setState(obj) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
      if (key === "streak") {
        console.log("streak", obj[key]);
        if (this.streak) {
          if (obj[key]) {
            this.streak = this.streak + obj[key];
          } else {
            this.streak = 0;
          }
        } else {
          if (obj[key] > 2) {
            this.streak = obj[key] - 1;
          } else {
            this.streak = obj[key];
          }
        }
      } else {
        this[key] = obj[key];
      }
    });
  }

  // Switch case should always end up with setting up block or calling newblock so it will emit actions to opponent
  action({ type }) {
    switch (type) {
      case "ArrowLeft":
        console.log("left");
        this.setState(moveSide(this.block, this.gameBoard, -1));
        break;
      case "ArrowRight":
        console.log("right");
        this.setState(moveSide(this.block, this.gameBoard, 1));
        break;
      case "ArrowDown":
        console.log("arrowDown");
        this.setState(moveDown(this.block, this.gameBoard));
        break;
      case "ArrowUp":
        console.log("arrowup");
        this.setState(turnBlock(this.block, this.gameBoard));
        break;
      case "Space":
        console.log("space");
        this.setState(moveDown(this.block, this.gameBoard, true));
        break;
      case "Init":
        console.log("init");
        this.gameBoard = emptyBoard;
        this.setState({
          gameBoard: emptyBoard,
          block: blockGenerator(Math.floor(Math.random() * 7))
        });
        break;
      default:
        console.log("default at Game.js");
        break;
    }
    //for callback so you will se your own board
    return { board: this.renderBoard, streak: this.streak };
  }
}
