import { EventListeners } from "./EventListeners";
import { initPlaceShips } from "./PlaceShips";
import { DOMHandler } from "./DOMHandler";
import { Game } from "./Game";
import { GameState } from "./StateManager";

export const eventListeners = new EventListeners();
export const globalDOM = new DOMHandler();

export const game = new Game("Kyle");
let myBoard = game.primaryPlayer;

//eventListeners.stateManager.hideMenuContainer();
eventListeners.stateManager.changeState(GameState.MENU);

// ----- Initializations -----
eventListeners.initPlayGameButton();
eventListeners.initSinglePlayerButton();
eventListeners.initConfirmShipPlacementButton();
eventListeners.initToggleOrientation();
initPlaceShips();

eventListeners.initPlaceShipEventListener(myBoard._board, "4a");
