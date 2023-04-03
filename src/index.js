import { Board } from "./Board";
import { EventListeners } from "./EventListeners";
import { initPlaceShips } from "./PlaceShips";

const eventListeners = new EventListeners();

eventListeners.initPlayGameButton();
eventListeners.initSinglePlayerButton();

initPlaceShips();
