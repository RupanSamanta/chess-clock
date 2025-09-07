import { players, intervalId, timeLeftBox, movesBox, buttons } from './setup.js';
import { getFormattedTime } from './utils.js';

function switchTurn(currentKey, nextKey) {
    const current = players[currentKey];
    const next = players[nextKey];
    
    if (next.timeUp || current.timeUp) return;
    
    // Toggle active-player CSS
    current.elem.classList.remove('active-player');
    next.elem.classList.add('active-player');

    // End current turn, stop its timer
    current.endTurn();
    if (intervalId[currentKey] == null) current.moves = 0;
    movesBox[currentKey].innerText = current.moves;
    clearInterval(intervalId[currentKey]);

    // Start next turn
    next.startTurn();

    // Start ticking
    intervalId[nextKey] = setInterval(() => {
        next.updateTime();
        if (next.timeUp) {
            next.elem.classList.add('time-up');
            clearInterval(intervalId[nextKey]);
        }
        timeLeftBox[nextKey].innerText = getFormattedTime(next.timeLeft);
    }, 1000);
}

// Hook up events
players.A.elem.addEventListener('click', () => switchTurn('A', 'B'));
players.B.elem.addEventListener('click', () => switchTurn('B', 'A'));

document.addEventListener("DOMContentLoaded", () => {
    Object.keys(players).forEach(key => {
        console.log(players[key].timeLeft);
        timeLeftBox[key].innerText = getFormattedTime(players[key].timeLeft);
    });
});