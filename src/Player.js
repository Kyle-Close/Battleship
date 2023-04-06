export class Player {
  constructor(name, board, opponentBoard) {
    this._name = name;
    this._board = board;
    this._opponentBoard = opponentBoard;
  }

  set name(value) {
    this._name = value;
  }
  get name() {
    return this._name;
  }
  get board() {
    return this._board;
  }
  get opponentBoard() {
    return this._opponentBoard;
  }
}

export class AI extends Player {
  constructor(board, opponentBoard) {
    super("Harold", board, opponentBoard);
  }

  // Add functionality here for handling AI shots/strategy //
}
