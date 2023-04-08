import { EventListeners } from "./EventListeners";
import { initPlaceShips } from "./PlaceShips";
import { Board } from "./Board";
import { DOMHandler } from "./DOMHandler";
import { Game } from "./Game";

export const eventListeners = new EventListeners();
export const globalDOM = new DOMHandler();

eventListeners.initPlayGameButton();
eventListeners.initSinglePlayerButton();
eventListeners.initToggleOrientation();

initPlaceShips();

export const game = new Game("Kyle");
let myBoard = game.primaryPlayer;

myBoard._board.placeShip([0, 3], true, 4);
myBoard._board.displayBoard();
console.log(game);

/* myBoard.placeShip([2, 4], true, 4);
myBoard.displayBoard();
globalDOM.displayHighlight();
 */
