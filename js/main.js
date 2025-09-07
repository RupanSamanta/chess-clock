import { players, intervalId, timeLeftBox, movesBox, buttons } from './setup.js';
import { getFormattedTime, playTimer, updateTimeLeftHTML, resetClock, switchTurn } from './utils.js';

// Hook up events
players.A.elem.addEventListener('click', () => switchTurn('A', 'B'));
players.B.elem.addEventListener('click', () => switchTurn('B', 'A'));

buttons.play.addEventListener('click', playTimer);
buttons.reset.addEventListener('click', resetClock);

document.addEventListener("DOMContentLoaded", () => {
    updateTimeLeftHTML();
});