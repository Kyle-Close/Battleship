export class Square {
  constructor() {
    this._isShot = false;
    this._type = null;
    this._isValidPlacement = true; // This is for ship placement
  }

  get isValidPlacement() {
    return this._isValidPlacement;
  }

  set isValidPlacement(value) {
    this._isValidPlacement = value;
  }
}
