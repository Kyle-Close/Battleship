import { Square } from "./Square";
import { Ship } from "./Ship";
import { globalDOM } from ".";

export class Board {
  constructor() {
    this._board = this.initEmptyBoard();
    this._ships = this.initShips();
  }

  get ships() {
    return this._ships;
  }

  displayBoard(location) {
    if (location === "place ships")
      globalDOM.displayPlaceShipsGrid(this._board);
    else if (location === "play game your grid")
      globalDOM.displayPlayGameYourGrid(this._board);
  }

  initEmptyBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = new Square();
      }
    }
    return board;
  }

  initShips() {
    let shipArr = [];
    // 1 size {4} ship
    shipArr.push(new Ship("4a", 4, 0, false));
    // 2 size {3} ships
    shipArr.push(new Ship("3a", 3, 0, false));
    shipArr.push(new Ship("3b", 3, 0, false));
    // 3 size {2} ships
    shipArr.push(new Ship("2a", 2, 0, false));
    shipArr.push(new Ship("2b", 2, 0, false));
    shipArr.push(new Ship("2c", 2, 0, false));
    // 4 size {1} ships
    shipArr.push(new Ship("1a", 1, 0, false));
    shipArr.push(new Ship("1b", 1, 0, false));
    shipArr.push(new Ship("1c", 1, 0, false));
    shipArr.push(new Ship("1d", 1, 0, false));

    return shipArr;
  }

  placeShip(startCoords, isVertical, size) {
    const isValid = isVertical
      ? this.isValidVertical(startCoords, size)
      : this.isValidHorizontal(startCoords, size);

    if (!isValid) return false;

    // At this point we are certain the placement is valid
    // Get the coordinates of the squares the ship will occupy
    const occupied = this.getOccupiedSquares(startCoords, isVertical, size);

    // Get a list of coordinates for only surrounding squares
    const surrounding = this.getSurroundingCoords(occupied);

    // Set the [hasShip] property to true for each square the ship will occupy
    this.setHasShipSquares(occupied);

    // Set the isAdjacent property of Squares surrounding the ship
    this.setAdjacentSquares(surrounding);
    return true;
  }

  setHasShipSquares(occupiedSquares) {
    occupiedSquares.forEach((coordinates) => {
      let x = coordinates[0];
      let y = coordinates[1];
      this._board[x][y].hasShip = true;
    });
  }

  setAdjacentSquares(surrounding) {
    surrounding.forEach((coorinates) => {
      let x = coorinates[0];
      let y = coorinates[1];
      this._board[x][y].isAdjacent = true;
    });
  }

  getOccupiedSquares(coords, isVertical, size) {
    let occupied = [];
    let x = coords[0];
    let y = coords[1];

    if (isVertical) {
      for (let i = 0; i < size; i++) {
        occupied[i] = [x, y - i];
      }
    } else {
      for (let i = 0; i < size; i++) {
        occupied[i] = [x - i, y];
      }
    }
    return occupied;
  }

  isValidVertical(coords, size) {
    // placeShip helper
    let x = coords[0];
    let y = coords[1];

    // Check if the ship goes off the board
    if (y - (size - 1) < 0) return false;

    // Get list of squares the ship will occupy
    let occupied = [];
    for (let i = 0; i < size; i++) {
      occupied[i] = [x, y - i];
    }

    // Check if any of the square are already taken
    let isValid = true;
    occupied.forEach((coords) => {
      let x = coords[0];
      let y = coords[1];
      if (this._board[x][y].hasShip || this._board[x][y].isAdjacent)
        isValid = false;
    });
    return isValid;
  }

  isValidHorizontal(coords, size) {
    // placeShip helper
    let x = coords[0];
    let y = coords[1];

    // Check if the ship goes off the board
    if (x - (size - 1) < 0) return false;

    // Get list of squares the ship will occupy
    let occupied = [];
    for (let i = 0; i < size; i++) {
      occupied[i] = [x - i, y];
    }

    // Check if any of the square are already taken
    let isValid = true;
    occupied.forEach((coords) => {
      let x = coords[0];
      let y = coords[1];
      if (this._board[x][y].hasShip || this._board[x][y].isAdjacent)
        isValid = false;
    });
    return isValid;
  }

  getSurroundingCoords(occupiedSquares) {
    // occupiedSquares is a list of coordinates that the ship will occupy
    // ie. [3, 3], [2, 3], [1, 3], [0, 3]

    let surrounding = [];
    for (let i = 0; i < occupiedSquares.length; i++) {
      // Add to list of surrounding squares
      let x = occupiedSquares[i][0];
      let y = occupiedSquares[i][1];

      // There are 9 total squares (including starting square) that can be set
      // First set the row (y) above
      surrounding.push([x - 1, y - 1]);
      surrounding.push([x, y - 1]);
      surrounding.push([x + 1, y - 1]);
      // Next, set the current row
      surrounding.push([x - 1, y]);
      surrounding.push([x, y]);
      surrounding.push([x + 1, y]);
      // Finally, set the row below
      surrounding.push([x - 1, y + 1]);
      surrounding.push([x, y + 1]);
      surrounding.push([x + 1, y + 1]);
    }

    // Filter out any duplicates
    const removedDuplicates = surrounding.filter((item, index, self) => {
      return (
        index ===
        self.findIndex((arr) => {
          return JSON.stringify(arr) === JSON.stringify(item);
        })
      );
    });

    // Filter out any negative coordinates && filter anything greater than 9 (end of board right side)
    const allUnavailableSquares = removedDuplicates.filter((item) => {
      return item[0] >= 0 && item[0] < 10 && item[1] >= 0 && item[1] < 10;
    });

    // Finally, filter out the original squares that the ship occupies.
    // Convert each coordinate pair in arrayB to a string representation
    const stringifiedArrayOriginal = occupiedSquares.map((pair) =>
      pair.toString()
    );
    const surroundingSquares = allUnavailableSquares.filter(
      (pair) => !stringifiedArrayOriginal.includes(pair.toString())
    );
    return surroundingSquares;
  }
}
