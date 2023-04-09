import { game } from ".";
import { isAllShipsSunk } from "./DOMHandler";

export class Player {
  constructor(name, board, opponentBoard) {
    this._name = name;
    this._board = board;
    this._opponentBoard = opponentBoard;
  }

  set name(value) {
    this._name = value;
  }
  get name() {
    return this._name;
  }
  get board() {
    return this._board;
  }
  get opponentBoard() {
    return this._opponentBoard;
  }
}

export class AI extends Player {
  constructor(board, opponentBoard) {
    super("Harold", board, opponentBoard);
  }

  setName(name) {
    super.name = name;
  }

  getName() {
    return super.name;
  }

  getBoard() {
    return super.board;
  }

  getOpponentBoard() {
    return super.opponentBoard;
  }

  // Add functionality here for handling AI shots/strategy //
  placeShipsOnBoard() {
    const board = super.board;
    let shipArr = [...board.ships];

    while (shipArr.length > 0) {
      const randX = Math.floor(Math.random() * 10);
      const randY = Math.floor(Math.random() * 10);
      const randomBool = Math.random() < 0.5;
      const randomIndex = Math.floor(Math.random() * shipArr.length);
      const randShip = shipArr[randomIndex];

      if (
        board.placeShip([randX, randY], randomBool, randShip.length, randShip)
      ) {
        shipArr.splice(randomIndex, 1);
      }
    }
  }

  takeTurn() {
    let isValidShot = false;
    console.log(game.primaryPlayer._board.ships);

    while (!isValidShot) {
      const primaryBoard = super.opponentBoard._board;
      const randX = Math.floor(Math.random() * 10);
      const randY = Math.floor(Math.random() * 10);
      if (!primaryBoard[randX][randY].isShot) {
        // Valid place to shoot
        primaryBoard[randX][randY].isShot = true;

        // Check if this square has a ship
        if (primaryBoard[randX][randY].hasShip) {
          // Get the ship that was hit
          const hitShip = primaryBoard[randX][randY].ship;
          // Increment how many times it was hit
          hitShip.incrementTimesHit();
          console.log(hitShip);
          // Check if it was sunk
          if (hitShip.isSunk) {
            // Set the [isSunk] property to true
            console.log("sunk:");
            console.log(hitShip);
            hitShip.isSunk = true;
            // Check if all ships have been sunk
            if (isAllShipsSunk(game.primaryPlayer._board.ships)) {
              alert("You lose!");
            }
          }
        }

        isValidShot = true;
      }
    }
    game.turn = 0;
  }
}
