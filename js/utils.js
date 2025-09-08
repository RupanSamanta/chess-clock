import { players, buttons, intervalId, timeLeftBox, movesBox } from './setup.js';

export function getFormattedTime(ms) {
    // converting to sec, min, hour
    let totalSeconds = Math.floor(ms / 1000);
    let sec = totalSeconds % 60;
    let min = Math.floor(totalSeconds / 60) % 60;
    let hour = Math.floor(totalSeconds / 3600);

    // formatting 
    if (hour > 0) {
        return `${hour}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    } else if (min > 0) {
        return `${min}:${sec.toString().padStart(2, '0')}`;
    } else {
        return `${sec}`;
    }
}

export function updateTimeLeftHTML() {
    Object.keys(players).forEach(key => {
        timeLeftBox[key].innerText = getFormattedTime(players[key].timeLeft);
        movesBox[key].innerText = players[key].moves;
    });
}

export function switchTurn(currentKey, nextKey) {
    const current = players[currentKey];
    const next = players[nextKey];

    if (next.timeUp || current.timeUp) return;

    // Toggle CSS
    current.elem.classList.remove('active-player');
    next.elem.classList.add('active-player');

    // Only end if current was really active
    if (current.active) {
        current.endTurn();
        movesBox[currentKey].innerText = current.moves;
    }
    clearInterval(intervalId[currentKey]);

    // Start next turn
    next.startTurn();
    clearInterval(intervalId[nextKey]);

    intervalId[nextKey] = setInterval(() => {
        next.updateTime();
        if (next.timeUp) {
            next.elem.classList.add('time-up');
            clearInterval(intervalId[nextKey]);
        }
        timeLeftBox[nextKey].innerText =
            getFormattedTime(Math.ceil(next.timeLeft / 1000) * 1000);
    }, 250);

    // Update UI
    buttons.play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    buttons.play.value = 1;
}

export function playTimer() {
    // pause
    if (buttons.play.value == 1) {
        Object.keys(players).forEach(key => {
            clearInterval(intervalId[key]);
            players[key].elem.classList.remove('active-player');
        });
        buttons.play.innerHTML = '<i class="fa-solid fa-play"></i>';
        buttons.play.value = 0;
        return;
    }

    // play/resume
    buttons.play.value = 1;

    // Find the active player (resume them)
    let activeKey = null;
    if (players.A.active) activeKey = 'A';
    if (players.B.active) activeKey = 'B';

    // If no one is active yet, start fresh with A
    if (!activeKey) {
        switchTurn('B', 'A'); // start with A
    } else {
        const active = players[activeKey];
        active.startTurn();
        active.elem.classList.add('active-player');
        
        intervalId[activeKey] = setInterval(() => {
            active.updateTime();
            if (active.timeUp) {
                active.elem.classList.add('time-up');
                clearInterval(intervalId[activeKey]);
            }
            timeLeftBox[activeKey].innerText = getFormattedTime(active.timeLeft);
        }, 1000);
    }

    buttons.play.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

export function resetClock() {
    buttons.play.value = 1;
    playTimer();
    setTimeout(() => {
        if (confirm('Reset Clock?')) {
            Object.keys(players).forEach(key => {
                players[key].reset();
                intervalId[key] = null;
            });
            updateTimeLeftHTML();
        }
    }, 150);
}