import { eventListeners, game } from ".";

const GRID_SIZE = 100;

export class DOMHandler {
  constructor() {
    this.placeShipsGridContainer = document.querySelector(".your-grid");
    this.playGameYourGrid = document.querySelector(".play-game-your-board");
  }

  displayPlayGameYourGrid(board) {
    // 1. Clear the existing grid if it exists
    this.clearPlayGameYourGrid();
    // 2. Create and place 100 squares on the grid
    this.createYourGridSquaresPlayGame();
    // 4. Add the correct CSS class to change the squares based on if
    //    the square has been hit or missed
    this.setSquareClassesYourGridPlayGame(board);
  }

  clearPlayGameYourGrid() {
    const gridContainer = this.playGameYourGrid;
    const totalSquares = gridContainer.children.length;

    if (totalSquares <= 0) return;

    while (this.placeShipsGridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
  }

  createYourGridSquaresPlayGame() {
    for (let i = 0; i < GRID_SIZE; i++) {
      const square = document.createElement("div");
      square.classList.add("play-game-your-board-default-square");
      square.dataset.index = i;
      square.style.display = "grid";
      square.style.placeItems = "center";
      this.playGameYourGrid.appendChild(square);
    }
  }

  setSquareClassesYourGridPlayGame(board) {
    let squashed = [];
    for (let j = 0; j < board[0].length; j++) {
      for (let i = 0; i < board.length; i++) {
        squashed.push(board[i][j]);
      }
    }
    // squashed and the children squares of your-grid will now have corresponding index
    for (let i = 0; i < squashed.length; i++) {
      const square = this.playGameYourGrid.querySelector(
        ":nth-child(" + (i + 1) + ")"
      );

      if (squashed[i].isShot && squashed[i].hasShip) {
        this.setSquareCSSClass(square, "direct-hit");
        this.addHitImgToSquare(square);
      }
      if (squashed[i].isShot && !squashed[i].hasShip) {
        this.setSquareCSSClass(square, "miss");
        this.addMissImgToSquare(square);
      }
    }
  }

  addHitImgToSquare(square) {
    const img = document.createElement("img");
    img.src = "./img/cross.svg";
    img.width = "40";
    img.alt = "White cross, indicating a direct hit";
    square.appendChild(img);
  }

  addMissImgToSquare(square) {
    const img = document.createElement("img");
    img.src = "./img/miss.svg";
    img.width = "20";
    img.alt = "Grey circle, indicating a missed shot";
    square.appendChild(img);
  }

  displayPlaceShipsGrid(board) {
    // Functionality to display board on place ships screen.
    // 1. Clear the existing grid if it exists
    this.clearPlaceShipsGrid();
    // 2. Create and place 100 squares on the grid
    this.createGridSquares();
    // 4. Add the correct CSS class to change the colors
    this.setSquareClasses(board);
  }

  addPlaceShipsEventListeners() {
    eventListeners.initPlaceShipEventListener(game.primaryPlayer._board, "4a");
  }

  setSquareClasses(board) {
    let squashed = [];
    for (let j = 0; j < board[0].length; j++) {
      for (let i = 0; i < board.length; i++) {
        squashed.push(board[i][j]);
      }
    }
    // squashed and the children squares of your-grid will now have corresponding index
    for (let i = 0; i < squashed.length; i++) {
      const square = this.placeShipsGridContainer.querySelector(
        ":nth-child(" + (i + 1) + ")"
      );

      if (squashed[i].isAdjacent) {
        this.setSquareCSSClass(square, "is-adjacent");
      }
      if (squashed[i].hasShip) {
        this.setSquareCSSClass(square, "has-ship");
      }
    }
  }

  setSquareCSSClass(square, className) {
    while (square.classList.length > 0) {
      square.classList.remove(square.classList[0]);
    }
    square.classList.add(className);
  }

  createGridSquares() {
    for (let i = 0; i < GRID_SIZE; i++) {
      const square = document.createElement("div");
      square.classList.add("default-square");
      square.dataset.index = i;
      this.placeShipsGridContainer.appendChild(square);
    }
  }

  clearPlaceShipsGrid() {
    const gridContainer = this.placeShipsGridContainer;
    const totalSquares = gridContainer.children.length;

    if (totalSquares <= 0) return;

    while (this.placeShipsGridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
  }
}
