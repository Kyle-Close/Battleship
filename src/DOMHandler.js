import { eventListeners, game } from ".";
import { activeYourShip } from "./PlaceShips";

const GRID_SIZE = 100;

export class DOMHandler {
  constructor() {
    this.placeShipsGridContainer = document.querySelector(".your-grid");
    this.playGameYourGrid = document.querySelector(".play-game-your-board");
    this.playGameEnemyGrid = document.querySelector(".play-game-enemy-board");
    this.lastHovered = null;
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

  displayPlayGameEnemyGrid(board) {
    // 1. Clear the existing grid if it exists
    this.clearPlayGameEnemyGrid();
    // 2. Create and place 100 squares on the grid
    this.createEnemyGridSquaresPlayGame();
    // 3. Add event handler for hovering and click
    //          ----- Code here -----
    // 4. Add the correct CSS class to change the squares based on if
    //    the square has been hit or missed
    this.setSquareClassesEnemyGridPlayGame(board);
  }

  setSquareClassesEnemyGridPlayGame(board) {
    let squashed = [];
    for (let j = 0; j < board[0].length; j++) {
      for (let i = 0; i < board.length; i++) {
        squashed.push(board[i][j]);
      }
    }
    // squashed and the children squares of your-grid will now have corresponding index
    for (let i = 0; i < squashed.length; i++) {
      const square = this.playGameEnemyGrid.querySelector(
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

  clearPlayGameYourGrid() {
    const gridContainer = this.playGameYourGrid;
    const totalSquares = gridContainer.children.length;

    if (totalSquares <= 0) return;

    while (this.playGameYourGrid.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
  }

  clearPlayGameEnemyGrid() {
    const gridContainer = this.playGameEnemyGrid;
    const totalSquares = gridContainer.children.length;

    if (totalSquares <= 0) return;

    while (this.playGameEnemyGrid.firstChild) {
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

  createEnemyGridSquaresPlayGame() {
    for (let i = 0; i < GRID_SIZE; i++) {
      const square = document.createElement("div");
      square.classList.add("play-game-enemy-board-default-square");
      square.dataset.index = i;
      square.style.display = "grid";
      square.style.placeItems = "center";
      square.addEventListener("mouseover", (e) => this.handleEnemyGridHover(e));
      square.addEventListener("click", (e) => this.handleEnemyGridClick(e));
      this.playGameEnemyGrid.appendChild(square);
    }
  }

  handleEnemyGridClick(e) {
    // Get whose turn it is.
    const turn = game.turn;
    if (turn === 1) {
      // AI's turn
      return;
    }

    const index = e.target.dataset.index;
    const enemyGameBoard = game.secondaryPlayer._board;
    // Get the coordinates to secondaryPlayer board shot location
    // 1. Translate index (0-99) to 2D coordinates ([x,y])
    const primaryPlayerShotLocation = convertTo2D(index, 10);
    // 2. Attempt to take the shot
    const isValidShot = enemyGameBoard.recieveShot(primaryPlayerShotLocation);
    // 3. If the shot was valid, update the board
    if (isValidShot) {
      // 0 = Already shot here, 1 = Shot missed any ships, ship object = shot hit a ship
      this.displayPlayGameEnemyGrid(enemyGameBoard._board);
      if (typeof isValidShot !== "number") {
        // This means we hit a ship. Check if the ship was destroyed
        if (isValidShot.isSunk) {
          // 1. Update Remaining ships to highlight red the ship we destroyed

          // 2. Check if all ships are destroyed. If yes, game over.
          if (isAllShipsSunk(game.secondaryPlayer._board.ships)) {
            // Game Over
            alert("Game over, you win!");
          }
        }
      }
    }
    game.turn = 1;
    game.secondaryPlayer.takeTurn();
    game.primaryPlayer._board.displayBoard("play game your grid");
  }

  handleEnemyGridHover(e) {
    const square = e.target;
    if (square.classList.contains("play-game-enemy-board-default-square")) {
      if (this.lastHovered) this.lastHovered.classList.remove("hovering");
      this.lastHovered = square;
      square.classList.add("hovering");
    } else {
      if (this.lastHovered) this.lastHovered.classList.remove("hovering");
      this.lastHovered = null;
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

      if (squashed[i].hasShip) {
        this.setSquareCSSClass(square, "occupied");
      }
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

    this.addPlaceShipsEventListeners();
    // 4. Add the correct CSS class to change the colors
    this.setSquareClasses(board);
  }

  addPlaceShipsEventListeners() {
    eventListeners.initPlaceShipEventListener(
      game.primaryPlayer._board,
      eventListeners.getSelectedShipId(activeYourShip)
    );
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

function convertTo2D(index, columns) {
  const x = index % columns;
  const y = Math.floor(index / columns);
  return [x, y];
}

export function isAllShipsSunk(ships) {
  let result = true;
  ships.forEach((ship) => {
    if (!ship.isSunk) result = false;
  });
  return result;
}
