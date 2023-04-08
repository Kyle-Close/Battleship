export class Ship {
  constructor(id, length, timesHit, isSunk) {
    this.id = id;
    this._length = length;
    this._timesHit = timesHit;
    this._isSunk = isSunk;
  }

  get length() {
    return this._length;
  }
}
