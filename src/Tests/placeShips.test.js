/* eslint-disable no-undef */
import { Board } from "../Board";

test("Valid Vertical Placement", () => {
  const testBoard = new Board();
  const startCoords = [7, 8];
  const isVertical = true;
  const size = 4;

  testBoard.placeShip(startCoords, isVertical, size);

  // Squares the ship occupies
  expect(testBoard._board[7][8].isValidPlacement).toBe(false);
  expect(testBoard._board[7][7].isValidPlacement).toBe(false);
  expect(testBoard._board[7][6].isValidPlacement).toBe(false);
  expect(testBoard._board[7][5].isValidPlacement).toBe(false);

  // Adjacent squares
  expect(testBoard._board[6][4].isValidPlacement).toBe(false);
  expect(testBoard._board[6][5].isValidPlacement).toBe(false);
  expect(testBoard._board[6][6].isValidPlacement).toBe(false);
  expect(testBoard._board[6][7].isValidPlacement).toBe(false);
  expect(testBoard._board[6][8].isValidPlacement).toBe(false);
  expect(testBoard._board[6][9].isValidPlacement).toBe(false);
  expect(testBoard._board[7][4].isValidPlacement).toBe(false);
  expect(testBoard._board[7][9].isValidPlacement).toBe(false);
  expect(testBoard._board[8][4].isValidPlacement).toBe(false);
  expect(testBoard._board[8][5].isValidPlacement).toBe(false);
  expect(testBoard._board[8][6].isValidPlacement).toBe(false);
  expect(testBoard._board[8][7].isValidPlacement).toBe(false);
  expect(testBoard._board[8][8].isValidPlacement).toBe(false);
  expect(testBoard._board[8][9].isValidPlacement).toBe(false);
});

test("Invalid Vertical Placement (Off Board)", () => {
  const testBoard = new Board();
  const startCoords = [7, 1];
  const isVertical = true;
  const size = 3;

  testBoard.placeShip(startCoords, isVertical, size);

  // Initial square should not be occupied because this is an invalid spot
  expect(testBoard._board[7][1].isValidPlacement).toBe(true);
});

test("Invalid Vertical Placement (Other ship is adjacent)", () => {
  const testBoard = new Board();
  testBoard._board[6][1].isValidPlacement = false;
  const startCoords = [6, 3];
  const isVertical = true;
  const size = 3;

  testBoard.placeShip(startCoords, isVertical, size);

  // Initial square should not be occupied because this is an invalid spot
  expect(testBoard._board[2][6].isValidPlacement).toBe(true);
});

// ====================== Horizontal placement ======================
test("Valid Horizontal Placement", () => {
  const testBoard = new Board();
  const startCoords = [9, 3];
  const isVertical = false;
  const size = 3;

  testBoard.placeShip(startCoords, isVertical, size);

  // Squares the ship occupies
  expect(testBoard._board[9][3].isValidPlacement).toBe(false);
  expect(testBoard._board[8][3].isValidPlacement).toBe(false);
  expect(testBoard._board[7][3].isValidPlacement).toBe(false);

  // Adjacent squares
  expect(testBoard._board[6][2].isValidPlacement).toBe(false);
  expect(testBoard._board[6][3].isValidPlacement).toBe(false);
  expect(testBoard._board[6][4].isValidPlacement).toBe(false);
  expect(testBoard._board[7][2].isValidPlacement).toBe(false);
  expect(testBoard._board[7][4].isValidPlacement).toBe(false);
  expect(testBoard._board[8][2].isValidPlacement).toBe(false);
  expect(testBoard._board[8][4].isValidPlacement).toBe(false);
  expect(testBoard._board[9][2].isValidPlacement).toBe(false);
  expect(testBoard._board[9][4].isValidPlacement).toBe(false);
});

test("Invalid Horizontal Placement (Off Board)", () => {
  const testBoard = new Board();
  const startCoords = [2, 7];
  const isVertical = false;
  const size = 4;

  testBoard.placeShip(startCoords, isVertical, size);

  // Initial square should not be occupied because this is an invalid spot
  expect(testBoard._board[2][7].isValidPlacement).toBe(true);
});

test("Invalid Horizontal Placement (Other ship is adjacent)", () => {
  const testBoard = new Board();
  testBoard._board[7][5].isValidPlacement = false;
  const startCoords = [9, 5];
  const isVertical = false;
  const size = 3;

  testBoard.placeShip(startCoords, isVertical, size);

  // Initial square should not be occupied because this is an invalid spot
  expect(testBoard._board[9][5].isValidPlacement).toBe(true);
});
