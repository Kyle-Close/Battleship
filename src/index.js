import { EventListeners } from "./EventListeners";
import { initPlaceShips } from "./PlaceShips";
import { Board } from "./Board";
import { DOMHandler } from "./DOMHandler";

export const eventListeners = new EventListeners();

eventListeners.initPlayGameButton();
eventListeners.initSinglePlayerButton();

initPlaceShips();

export const globalDOM = new DOMHandler();

let myBoard = new Board();
myBoard.placeShip([2, 4], true, 4);
myBoard.displayBoard();
globalDOM.displayHighlight();
