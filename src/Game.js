import { Board } from "./Board";
import { Player, AI } from "./Player";

export class Game {
  constructor(primaryPlayer, secondaryPlayer) {
    let primaryBoard = new Board();
    let secondaryBoard = new Board();

    this._primaryPlayer = new Player(
      primaryPlayer,
      primaryBoard,
      secondaryBoard
    );
    if (secondaryPlayer)
      this._secondaryPlayer = new Player(
        secondaryPlayer,
        secondaryBoard,
        primaryBoard
      );
    else this._secondaryPlayer = new AI(secondaryBoard, primaryBoard);
    this._turn = 0;
  }
  get primaryPlayer() {
    return this._primaryPlayer;
  }

  get secondaryPlayer() {
    return this._secondaryPlayer;
  }

  set turn(value) {
    this._turn = value;
  }

  get turn() {
    return this._turn;
  }
}
