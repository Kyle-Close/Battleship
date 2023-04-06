import { Player, AI } from "./Player";

export class Game {
  constructor(primaryPlayer, secondaryPlayer) {
    this._primaryPlayer = Player(primaryPlayer);
    if (secondaryPlayer) this._secondaryPlayer = Player(secondaryPlayer);
    else this._secondaryPlayer = AI(secondaryPlayer);
    this._turn = null;
  }
}
