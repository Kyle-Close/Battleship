let isVerticalState = true;

export function setIsVerticalState(value) {
  isVerticalState = value;
}

export function getIsVerticalState() {
  return isVerticalState;
}

// Currently Placing ships
const SHIP_4 = document.querySelector(".current-ship-4");
const SHIP_3 = document.querySelector(".current-ship-3");
const SHIP_2 = document.querySelector(".current-ship-2");
const SHIP_1 = document.querySelector(".current-ship-1");

// Your ships
const SHIPS_4A = document.querySelector(".size-4.one");

const SHIPS_3A = document.querySelector(".size-3.one");
const SHIPS_3B = document.querySelector(".size-3.two");

const SHIPS_2A = document.querySelector(".size-2.one");
const SHIPS_2B = document.querySelector(".size-2.two");
const SHIPS_2C = document.querySelector(".size-2.three");

const SHIPS_1A = document.querySelector(".size-1.one");
const SHIPS_1B = document.querySelector(".size-1.two");
const SHIPS_1C = document.querySelector(".size-1.three");
const SHIPS_1D = document.querySelector(".size-1.four");

let yourShipsArray = [
  SHIPS_4A,
  SHIPS_3A,
  SHIPS_3B,
  SHIPS_2A,
  SHIPS_2B,
  SHIPS_2C,
  SHIPS_1A,
  SHIPS_1B,
  SHIPS_1C,
  SHIPS_1D,
];

let activeYourShip = SHIPS_4A;
let currentlyActiveShipPlacement = SHIP_4;

export function removeSelectedYourShip() {
  // Remove the active class on the selected ship
  removeActiveYourShipClass();
  // Set the id on the placed ship
  setPlacedShipId();

  // Remove the ship from the list if it exists
  for (let i = 0; i < yourShipsArray.length; i++) {
    if (yourShipsArray[i] === activeYourShip) {
      yourShipsArray.splice(i, 1);
    }
  }
  // Set new active ship to the first ship left in the array
  if (yourShipsArray.length > 0) {
    setActiveYourShip(yourShipsArray[0]);
    hideCurrentlyPlacing();
    const selectedShip = getSelectedShip(yourShipsArray[0]);
    updateCurrentlyPlacing(selectedShip);
  }
}

function setPlacedShipId() {
  // This is used for setting the HTML class
  // on the 'your ships' ship that has been placed on the board
  const squares = activeYourShip.querySelectorAll("div");
  squares.forEach((square) => {
    square.id = "placed";
  });
}

function hideCurrentlyPlacing() {
  currentlyActiveShipPlacement.style.display = "none";
}

function updateCurrentlyPlacing(currentShip) {
  currentShip.style.display = "grid";
}

export function setActiveYourShip(ship) {
  ship.classList.add("active");
  activeYourShip = ship;
}

export function getYourActiveShip() {
  return activeYourShip;
}

function getSelectedShip(ship) {
  switch (ship.classList[1]) {
    case "size-4":
      currentlyActiveShipPlacement = SHIP_4;
      return document.querySelector(".current-ship-4");
    case "size-3":
      currentlyActiveShipPlacement = SHIP_3;
      return document.querySelector(".current-ship-3");
    case "size-2":
      currentlyActiveShipPlacement = SHIP_2;
      return document.querySelector(".current-ship-2");
    case "size-1":
      currentlyActiveShipPlacement = SHIP_1;
      return document.querySelector(".current-ship-1");
  }
}

export function getActiveShipLength() {
  const classStr = (activeShip) => {
    const numberRegex = /\d+/;

    for (let i = 0; i < activeShip.classList.length; i++) {
      if (numberRegex.test(activeShip.classList[i])) {
        return activeShip.classList[i];
      }
    }
    return null;
  };

  const className = classStr(activeYourShip);
  if (!className) return null;

  const length = className.match(/\d+/); // Find the first sequence of digits in the string
  return length ? parseInt(length[0], 10) : null;
}

export function initPlaceShips() {
  const ships = document.querySelectorAll(".ship");
  ships.forEach((ship) => {
    ship.addEventListener("click", (e) => handleYourShipsClicks(e));
  });
}

function handleYourShipsClicks(e) {
  // Check if the ship they clicked on has not been placed already
  if (!isShipPlaced(e.target.parentElement)) return;
  // If not placed, remove the 'active' class from the previously selected ship
  removeActiveYourShipClass();
  // Set the new selected ships class to active
  setActiveYourShip(e.target.parentElement);
  // Remove currently Placing from display
  hideCurrentlyPlacing();
  // Set currently placing to the ship that was clicked
  const selectedShip = getSelectedShip(e.target.parentElement);
  updateCurrentlyPlacing(selectedShip);
}

function isShipPlaced(ship) {
  let isFound = false;
  yourShipsArray.forEach((element) => {
    if (ship === element) isFound = true;
  });
  return isFound;
}

function removeActiveYourShipClass() {
  activeYourShip.classList.remove("active");
}

export function isAllShipsPlaced() {
  if (yourShipsArray.length > 0) return false;
  else return true;
}
