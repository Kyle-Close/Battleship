import { Board } from "./Board";

export class Game {
  constructor(type, primaryPlayer, secondaryPlayer) {
    this._type = type;
    this._primaryPlayer = primaryPlayer;
    if (secondaryPlayer) this._secondaryPlayer = secondaryPlayer;
    else this._secondaryPlayer = null;
    this._primaryPlayerBoard = new Board();
    this._secondaryPlayerBoard = new Board();
    this._turn = null;
  }
}
