import { StateManager, GameState } from "./StateManager";

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

  initPlaceShipEventListener(length, isVertical) {
    // For tmrw
    // Instead of passing in length and isVertical I should make some sort of object to hold the current selected ship and it's size and rotation.
    // The obj can be just for PlaceShips page to hold some info we need.

    for (let i = 0; i < this.placeShipsGridContainer.children.length; i++) {
      const cell = this.placeShipsGridContainer.children[i];

      cell.addEventListener("mouseover", (e) => {
        if (e.target == this.lastHighlighted[0]) return;
        this.clearLastHighlighted();
        if (isVertical) {
          for (let j = 0; j < length; j++) {
            const nextIndex = i - 10 * j;
            if (nextIndex >= 0) {
              const nextSquareToHighlight =
                this.placeShipsGridContainer.children[nextIndex];
              this.lastHighlighted.push(nextSquareToHighlight);
              nextSquareToHighlight.id = "highlight";
            } else {
              this.clearLastHighlighted();
            }
          }
        } else {
          for (let j = 0; j < length; j++) {
            const nextIndex = i - 1 * j;
            const lastDigit = nextIndex % 10;
            if (j === 0 && lastDigit - (length - 1) < 0) {
              this.clearLastHighlighted();
              return;
            }
            const nextSquareToHighlight =
              this.placeShipsGridContainer.children[nextIndex];
            this.lastHighlighted.push(nextSquareToHighlight);
            nextSquareToHighlight.id = "highlight";
          }
        }
      });
    }
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
