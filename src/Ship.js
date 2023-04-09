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

  incrementTimesHit() {
    this._timesHit++;
  }

  get timesHit() {
    return this._timesHit;
  }

  get isSunk() {
    if (this._timesHit >= this._length) return true;
    else return false;
  }

  set isSunk(value) {
    this._isSunk = value;
  }
}
