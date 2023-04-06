// Any logic that has to do with place ships page
const SHIP_4 = document.querySelector(".current-ship-4");
const SHIP_3 = document.querySelector(".current-ship-3");
const SHIP_2 = document.querySelector(".current-ship-2");
const SHIP_1 = document.querySelector(".current-ship-1");

const SHIPS_SIZE4_1 = document.querySelector(".size-4.one");
const SHIPS_SIZE3_1 = document.querySelector(".size-3.one");
const SHIPS_SIZE3_2 = document.querySelector(".size-3.two");
const SHIPS_SIZE2_1 = document.querySelector(".size-2.one");
const SHIPS_SIZE2_2 = document.querySelector(".size-2.two");
const SHIPS_SIZE2_3 = document.querySelector(".size-2.three");
const SHIPS_SIZE1_1 = document.querySelector(".size-1.one");
const SHIPS_SIZE1_2 = document.querySelector(".size-1.two");
const SHIPS_SIZE1_3 = document.querySelector(".size-1.three");
const SHIPS_SIZE1_4 = document.querySelector(".size-1.four");

let currentlyActiveShipPlacement = SHIP_4;
let currentlyActiveYourShips = SHIPS_SIZE4_1;

function hideCurrentlyPlacing() {
  currentlyActiveShipPlacement.style.display = "none";
}

function updateCurrentlyPlacing(currentShip) {
  currentShip.style.display = "grid";
}

function setCurrentActiveYourShip(parent) {
  currentlyActiveYourShips = parent;
}

function getSelectedShip(e) {
  const parentDiv = e.target.parentElement;
  switch (parentDiv.classList[1]) {
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

export function initPlaceShips() {
  const ships = document.querySelectorAll(".ship");
  ships.forEach((ship) => {
    ship.addEventListener("click", (e) => {
      // Clear currently active
      currentlyActiveYourShips.classList.remove("active");
      ship.classList.add("active");
      setCurrentActiveYourShip(e.target.parentElement);
      // Remove currently active from display
      hideCurrentlyPlacing();
      const selectedShip = getSelectedShip(e);
      highlightSelectedShip(e);

      updateCurrentlyPlacing(selectedShip);
    });
  });
}

function highlightSelectedShip(e) {
  const ship = e.target.parentElement;
  //ship.style.transform = "translateY(-5px)";
  //ship.style.border = "3px solid orange";
}
