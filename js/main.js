import { players, intervalId, timeLeftBox, movesBox, buttons } from './setup.js';
import { getFormattedTime, playTimer, updateTimeLeftHTML, resetClock, switchTurn, toggleFullscreen, updateFullscreenUI, setAdjustTimer } from './utils.js';

players.A.elem.addEventListener('click', () => {
    // Case 1: play is running → normal handoff
    if (buttons.play.value == 1 && players.A.active) {
        switchTurn('A', 'B');
        return;
    }
    // Case 2: fresh game, no one active yet
    if (!players.A.active && !players.B.active) {
        switchTurn('A', 'B');
        return;
    }
    // Case 3: if paused, switch start on click
    if (buttons.play.value == 0) {
        switchTurn('A', 'B');
    }
});

players.B.elem.addEventListener('click', () => {
    if (buttons.play.value == 1 && players.B.active) {
        switchTurn('B', 'A');
        return;
    }
    if (!players.A.active && !players.B.active) {
        switchTurn('B', 'A');
        return;
    }
    if (buttons.play.value == 0) {
        switchTurn('B', 'A');
    }
});

buttons.play.addEventListener('click', playTimer);
buttons.reset.addEventListener('click', resetClock);
buttons.fullscreen.addEventListener('click', toggleFullscreen);

document.addEventListener("DOMContentLoaded",  ()=> {
    updateTimeLeftHTML();
    setAdjustTimer();
});
document.addEventListener('fullscreenchange', updateFullscreenUI);
