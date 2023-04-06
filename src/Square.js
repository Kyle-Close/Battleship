export class Square {
  constructor() {
    this._hasShip = false;
    this._ship = null;
    this._isShot = false;
    this._isAdjacent = false; // If there is a square around it. Use this for printing the board
  }

  set hasShip(value) {
    this._hasShip = value;
  }
  get hasShip() {
    return this._hasShip;
  }
  set ship(value) {
    this._ship = value;
  }
  get ship() {
    return this._ship;
  }
  set isShot(value) {
    this.isShot = value;
  }
  get isShot() {
    return this._isShot;
  }
  set isAdjacent(value) {
    this._isAdjacent = value;
  }
  get isAdjacent() {
    return this._isAdjacent;
  }
}
