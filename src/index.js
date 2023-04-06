import { EventListeners } from "./EventListeners";
import { initPlaceShips } from "./PlaceShips";
import { Board } from "./Board";
import { DOMHandler } from "./DOMHandler";

const eventListeners = new EventListeners();

eventListeners.initPlayGameButton();
eventListeners.initSinglePlayerButton();

initPlaceShips();

export const globalDOM = new DOMHandler();

let myBoard = new Board();
myBoard.placeShip([0, 3], true, 4);
myBoard.displayBoard();
