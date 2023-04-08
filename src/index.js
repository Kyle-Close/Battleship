import { EventListeners } from "./EventListeners";
import { initPlaceShips } from "./PlaceShips";
import { DOMHandler } from "./DOMHandler";
import { Game } from "./Game";
import { GameState } from "./StateManager";

export const eventListeners = new EventListeners();
export const globalDOM = new DOMHandler();

eventListeners.initPlayGameButton();
eventListeners.initSinglePlayerButton();
eventListeners.initConfirmShipPlacementButton();
eventListeners.initToggleOrientation();

initPlaceShips();

export const game = new Game("Kyle");
let myBoard = game.primaryPlayer;

myBoard._board.displayBoard("place ships");

eventListeners.stateManager.hideMenuContainer();
eventListeners.stateManager.changeState(GameState.PLAY_GAME);

myBoard._board.placeShip([0, 3], true, 4);
myBoard._board.placeShip([9, 9], true, 3);
myBoard._board.placeShip([5, 7], false, 3);

myBoard._board._board[0][0].isShot = true;
myBoard._board._board[0][1].isShot = true;
myBoard._board._board[1][0].isShot = true;

myBoard._board.displayBoard("play game your grid");

console.log(myBoard);
