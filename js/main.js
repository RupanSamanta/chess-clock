import {
    players,
    intervalId,
    timeLeftBox,
    movesBox,
    buttons
} from './setup.js';
import {
    getFormattedTime,
    playTimer,
    updateTimeLeftHTML,
    resetClock,
    switchTurn,
    toggleFullscreen,
    updateFullscreenUI,
    setAdjustTimer,
    saveNewTimer,
    createPresetList
} from './utils.js';

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
buttons.saveTimer.addEventListener('click', saveNewTimer);
buttons.cancelTimer.addEventListener('click', ()=> {
    document.getElementById('adjust-timer-section').style.display = 'none';
});

Array.from(buttons.timeAdjustButtons).forEach((button)=> {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        document.getElementById('adjust-timer-section').style.display = 'flex';
        document.getElementById('adjust-timer').dataset.adjustTimer = this.dataset.adjust;

    });
});

document.addEventListener("DOMContentLoaded", ()=> {
    updateTimeLeftHTML();
    setAdjustTimer();
    createPresetList();
});
document.addEventListener('fullscreenchange', updateFullscreenUI);