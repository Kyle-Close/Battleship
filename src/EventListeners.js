import { StateManager, GameState } from "./StateManager";
import {
  setIsVerticalState,
  getIsVerticalState,
  isAllShipsPlaced,
  getActiveShipLength,
  removeSelectedYourShip,
} from "./PlaceShips";
import { game } from ".";

// For tmrw
// Got placing somewhat working. Its not updating the isVertical after placing I think.
// So placing horizontal is wonky

export class EventListeners {
  constructor() {
    this.stateManager = new StateManager();
    this.sourceCodeButton = document.querySelector(".source-code");
    this.singlePlayerButton = document.querySelector(".single-player-button");
    this.playGameButton = document.querySelector(".play-game-button");
    this.primaryPlayerNameInput = document.querySelector(
      "#primary-player-name"
    );
    this.primaryPlayerNameInputError = document.querySelector(
      ".primary-player-error"
    );
    this.placeShipsGridContainer = document.querySelector(".your-grid");
    this.lastHighlighted = [];
  }

  initToggleOrientation() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "r") {
        if (getIsVerticalState()) {
          setIsVerticalState(false);
          this.updateHighlightedCells(this.lastHighlighted[0], true);
        } else {
          setIsVerticalState(true);
          this.updateHighlightedCells(this.lastHighlighted[0], true);
        }
      }
    });
  }

  updateHighlightedCells(cell, isOnToggle) {
    if (cell == this.lastHighlighted[0] && !isOnToggle) return;
    if (
      cell.classList.contains("has-ship") ||
      cell.classList.contains("is-adjacent")
    ) {
      return;
    }

    const length = getActiveShipLength();
    const index = cell.dataset.index;

    this.clearLastHighlighted();

    if (getIsVerticalState() && fitsOnBoard(index, length, true)) {
      for (let j = 0; j < length; j++) {
        const nextIndex = index - 10 * j;
        if (nextIndex >= 0) {
          const nextSquareToHighlight =
            this.placeShipsGridContainer.children[nextIndex];
          this.lastHighlighted.push(nextSquareToHighlight);
          nextSquareToHighlight.id = "highlight";
        } else {
          this.clearLastHighlighted();
        }
      }
    } else if (!getIsVerticalState()) {
      if (!fitsOnBoard(index, length, false)) {
        this.clearLastHighlighted();
        return;
      }

      for (let j = 0; j < length; j++) {
        const nextIndex = index - 1 * j;
        const nextSquareToHighlight =
          this.placeShipsGridContainer.children[nextIndex];
        this.lastHighlighted.push(nextSquareToHighlight);
        nextSquareToHighlight.id = "highlight";
      }
    }
  }

  handleCellMouseOver(cell, length) {
    // Bind the onMouseOver function to the current instance and pass the length parameter
    const boundOnMouseOver = (e) =>
      this.updateHighlightedCells(e.target, length);
    cell.addEventListener("mouseover", boundOnMouseOver);
  }

  handleClick(cell) {
    // Create a bound function that will call this.placeShip when the event is triggered
    const boundOnClick = () => this.placeShip(cell);
    cell.addEventListener("click", boundOnClick);
  }

  placeShip(cell) {
    // Check if all ships have been placed already
    if (isAllShipsPlaced()) return;

    // Convert cell index to 2d array coordinates
    const isVertical = getIsVerticalState();
    const length = getActiveShipLength();
    const startingCoords = indexToCoordinates(cell.dataset.index);

    if (
      game._primaryPlayer._board.placeShip(startingCoords, isVertical, length)
    ) {
      removeSelectedYourShip();
    }
    game._primaryPlayer._board.displayBoard();
  }

  initPlaceShipEventListener(board, currentlySelectedId) {
    // Get currently selected ship
    const ship = board.ships.find((ship) => ship.id === currentlySelectedId);
    const length = ship.length;

    const cellList = this.placeShipsGridContainer.querySelectorAll("div");

    cellList.forEach((cell) => {
      this.handleCellMouseOver(cell, length);
      this.handleClick(cell);
    });
  }

  clearLastHighlighted() {
    while (this.lastHighlighted.length > 0) {
      this.lastHighlighted[0].id = "";
      this.lastHighlighted.shift(); // Remove first element from lastHighlighted
    }
  }

  initSinglePlayerButton() {
    this.singlePlayerButton.addEventListener("click", () => {
      this.stateManager.changeState(GameState.MENU_SINGLE);
    });
  }

  initPlayGameButton() {
    this.playGameButton.addEventListener("click", () => {
      // Check if name input is empty
      const primaryName = this.primaryPlayerNameInput.value;
      if (!primaryName) {
        this.primaryPlayerNameInputError.style.display = "block";
        return;
      }
      this.primaryPlayerNameInputError.style.display = "none";
      this.stateManager.changeState(GameState.PLACE_SHIPS);
    });
  }

  initSourceCodeButton() {
    this.sourceCodeButton.addEventListener("click", () => {});
  }
}

function fitsOnBoard(index, length, isVertical) {
  if (isVertical) {
    // Check if the length would cause wrapping to the previous row
    const topRowIndex = index - 10 * (length - 1);
    if (topRowIndex < 0) {
      return false;
    }
  } else {
    // Check if the length would cause wrapping to the previous column
    const firstSquareIndex = index - (length - 1);
    const firstSquareColumn = firstSquareIndex % 10;
    const lastSquareColumn = index % 10;

    if (firstSquareIndex < 0 || firstSquareColumn > lastSquareColumn) {
      return false;
    }
  }
  return true;
}

function indexToCoordinates(index) {
  const x = index % 10;
  const y = Math.floor(index / 10);
  return [x, y];
}
