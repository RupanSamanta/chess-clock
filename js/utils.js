import {
    players,
    buttons,
    intervalId,
    timeLeftBox,
    movesBox,
    adjustTimer,
    presetTime,
    themeColor
} from './setup.js';

import Player from './player.js';

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
    playAudio('play');
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
    timeLeftBox[currentKey].innerText =
    getFormattedTime(Math.ceil(current.timeLeft / 1000) * 1000);

    // Start next turn
    next.startTurn();
    clearInterval(intervalId[nextKey]);

    intervalId[nextKey] = setInterval(() => {
        next.updateTime();
        if (next.timeUp) {
            playAudio('timeup');
            next.elem.classList.add('time-up');
            clearInterval(intervalId[nextKey]);
            buttons.play.disabled = true;
        }
        timeLeftBox[nextKey].innerText =
        getFormattedTime(Math.ceil(next.timeLeft / 1000) * 1000);
    },
        250);

    // Update UI
    buttons.play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    buttons.play.value = 1;
    Array.from(buttons.timeAdjustButtons)
    .forEach(button => button.style.display = 'none');
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
        Array.from(buttons.timeAdjustButtons).forEach(button => button.style.display = 'flex');
        return;
    }

    playAudio('play');
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
                playAudio('timeup');
                active.elem.classList.add('time-up');
                buttons.play.disabled = true;
                clearInterval(intervalId[activeKey]);
            }
            timeLeftBox[activeKey].innerText = getFormattedTime(active.timeLeft);
        },
            1000);
    }
    buttons.play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    Array.from(buttons.timeAdjustButtons)
    .forEach(button => button.style.display = 'none');
}

export function resetClock() {
    buttons.play.value = 1;
    playTimer();
    setTimeout(() => {
        if (confirm('Reset Clock?')) {
            playAudio('reset');
            Object.keys(players).forEach(key => {
                players[key].reset();
                players[key].elem.classList.remove('time-up');
                intervalId[key] = null;
            });
            updateTimeLeftHTML();
            buttons.play.disabled = false;
        }
    },
        150);
}

export function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

export function updateFullscreenUI() {
    if (document.fullscreenElement) {
        buttons.fullscreen.innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
        buttons.fullscreen.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
}

function createOptions(elem, min, max) {
    while (min <= max) {
        const option = document.createElement('option');
        option.innerText = min.toString().padStart(2, '0');
        option.value = min.toString().padStart(2, '0');
        elem.appendChild(option);
        min++;
    }
}

export function setAdjustTimer() {
    createOptions(adjustTimer.hour, 0, 99);
    createOptions(adjustTimer.minute, 0, 59);
    createOptions(adjustTimer.second, 0, 59);
}

function getMillisecond(hour = 0, min = 0, sec = 0) {
    return ((hour * 60 + min*1) * 60 + sec*1) * 1000;
}

export function saveNewTimer() {
    const adjust_player = document.getElementById('adjust-timer').dataset.adjustTimer;
    players[adjust_player].timeLeft = getMillisecond(
        adjustTimer.hour.value,
        adjustTimer.minute.value,
        adjustTimer.second.value
    );
    setTimeout(() => {
        buttons.cancelTimer.click();
    }, 300);
    updateTimeLeftHTML();
}

export function createPresetList() {
    const presetTimeBody = document.getElementsByClassName('preset-time')[0];
    presetTime.forEach((obj, ind)=> {
        const label = document.createElement('label');
        label.innerHTML =
        `<span>${obj.title}</span>
        <input type="radio" name="preset-timer" value="${ind}" ${obj.totalTime == 600000 ? 'checked': ''}/>`;
        presetTimeBody.insertBefore(label, presetTimeBody.lastElementChild);
    });
}

export function createThemeList() {
    const themeBody = document.getElementById('theme-colors-box');
    themeColor.forEach((val)=> {
        themeBody.innerHTML +=
        `<input type="radio" name="theme-color" value="${val}" style="--color: ${val};"/>`;
    });
    themeBody.firstElementChild.checked = true;
}

export function initStartNewTimer() {
    let timer_obj;
    const preset_timer = document.querySelectorAll('input[name="preset-timer"]');
    for (let i = 0; i < preset_timer.length; i++) {
        if (preset_timer[i].checked) {
            timer_obj = presetTime[i];
            break;
        }
    }
    players.A = new Player('player-A', timer_obj.totalTime, timer_obj.increment);
    players.B = new Player('player-B', timer_obj.totalTime, timer_obj.increment);

    updateTimeLeftHTML();
    Array.from(document.getElementsByClassName('time-format'))
    .forEach(elem => elem.innerText = timer_obj.title);
}

function playAudio(type) {
    if (buttons.mute.dataset.mute === 'true') return;
    let name;
    switch (type) {
        case 'play':
            name = 'start-click';
            break;
        case 'reset':
            name = 'reset-click';
            break;
        case 'timeup':
            name = 'timeup';
            break;
        default:
            return;
        }
        const audio = new Audio(`../assets/audio/${name}.mp3`);
        audio.load();
        audio.play();
    }