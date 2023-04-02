import { Board } from "./Board";
import { StateManager, GameState } from "./StateManager";

let testBoard = new Board();

//console.dir(testBoard);
//testBoard._board[1][3].isValidPlacement = false;
//console.log(testBoard.isValidHorizontal([2, 3], 3));

/*let arr = [
  [3, 3],
  [2, 3],
  [1, 3],
  [0, 3],
];*/

//testBoard.setIsValidPlacementSurrounding(arr);

//testBoard.placeShip([0, 2], true, 3);
//testBoard.placeShip([0, 9], false, 4);

const stateManager = new StateManager();

const singlePlayerButton = document.querySelector(".single-player-button");
const playGameButton = document.querySelector(".play-game-button");

singlePlayerButton.addEventListener("click", () => {
  stateManager.changeState(GameState.MENU_SINGLE);
});

playGameButton.addEventListener("click", () => {
  stateManager.changeState(GameState.PLACE_SHIPS);
});
