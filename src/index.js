import { Board } from "./Board";

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

testBoard.placeShip([0, 2], true, 3);
testBoard.placeShip([5, 2], false, 4);
