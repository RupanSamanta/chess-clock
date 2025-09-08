import { players, intervalId, timeLeftBox, movesBox, buttons } from './setup.js';
import { getFormattedTime, playTimer, updateTimeLeftHTML, resetClock, switchTurn } from './utils.js';

// Hook up events
players.A.elem.addEventListener('click', () => {
    // Case 1: play is running → normal handoff
    if (buttons.play.value == 1 && players.A.active) {
        switchTurn('B', 'A');
        return;
    }

    // Case 2: fresh game, no one active yet
    if (!players.A.active && !players.B.active) {
        buttons.play.value = 1; // auto-enable play
        switchTurn('A', 'B');
    }
});

players.B.elem.addEventListener('click', () => {
    if (buttons.play.value == 1 && players.B.active) {
        switchTurn('A', 'B');
        return;
    }

    if (!players.A.active && !players.B.active) {
        buttons.play.value = 1;
        switchTurn('B', 'A');
    }
});

buttons.play.addEventListener('click', playTimer);
buttons.reset.addEventListener('click', resetClock);

document.addEventListener("DOMContentLoaded", () => {
    updateTimeLeftHTML();
});