export const GameState = {
  MENU: "menu",
  MENU_SINGLE: "single",
  PLACE_SHIPS: "placeShips",
  PLAY_GAME: "playGame",
};

export class StateManager {
  constructor() {
    this.currentState = GameState.MENU;
  }

  changeState(newState) {
    this.hideCurrentState();
    this.currentState = newState;
    this.onStateChange(newState);
  }

  onStateChange(state) {
    // Handle UI updates or other actions when the state changes.
    switch (state) {
      case GameState.MENU:
        // Show the menu screen.
        this.displayMenu();
        break;
      case GameState.MENU_SINGLE:
        // Show the menu single player screen.
        this.displayMenuSingle();
        break;
      case GameState.PLACE_SHIPS:
        // Show the place ships screen.
        this.displayPlaceShips();
        break;
      case GameState.PLAY_GAME:
        // Show the play game screen.
        this.displayPlayGame();
        break;
      default:
        console.error("Invalid state:", state);
    }
  }

  hideCurrentState() {
    let currentState = this.currentState;
    switch (currentState) {
      case GameState.MENU:
        this.hideMenu();
        break;
      case GameState.MENU_SINGLE:
        this.hideMenuSingle();
        break;
      case GameState.PLACE_SHIPS:
        this.hidePlaceShips();
    }
  }

  displayMenu() {
    const menuDiv = document.querySelector(".play-options");
    menuDiv.style.display = "grid";
  }

  hideMenu() {
    const menuDiv = document.querySelector(".play-options");
    menuDiv.style.display = "none";
  }

  displayMenuSingle() {
    const menuDiv = document.querySelector(".single-player");
    menuDiv.style.display = "grid";
  }

  hideMenuSingle() {
    const menuDiv = document.querySelector(".container-menu");
    menuDiv.style.display = "none";
  }

  hideMenuContainer() {
    const menuDiv = document.querySelector(".container-menu");
    menuDiv.style.display = "none";
  }

  displayPlaceShips() {
    const container = document.querySelector(".container-place-ships");
    container.style.display = "grid";
  }

  hidePlaceShips() {
    const container = document.querySelector(".container-place-ships");
    container.style.display = "none";
  }

  displayPlayGame() {
    const container = document.querySelector(".container-play-game");
    container.style.display = "grid";
  }

  hidePlayGame() {
    const container = document.querySelector(".container-play-game");
    container.style.display = "none";
  }
}
