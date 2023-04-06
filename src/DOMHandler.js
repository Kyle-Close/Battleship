import { eventListeners } from ".";

const GRID_SIZE = 100;

export class DOMHandler {
  constructor() {
    this.placeShipsGridContainer = document.querySelector(".your-grid");
  }

  displayHighlight() {
    // Highlights the where the currently selected ship would be placed.
  }

  displayPlaceShipsGrid(board) {
    console.log(board);
    // Functionality to display board on place ships screen.
    // 1. Clear the existing grid if it exists
    this.clearPlaceShipsGrid();
    // 2. Create and place 100 squares on the grid
    this.createGridSquares();
    // 3. Add event listeners to the squares
    this.addPlaceShipsEventListeners();
    // 4. Add the correct CSS class to change the colors
    this.setSquareClasses(board);
  }

  addPlaceShipsEventListeners() {
    eventListeners.initPlaceShipEventListener(3, false);
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
