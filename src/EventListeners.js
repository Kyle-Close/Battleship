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
