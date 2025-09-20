import Player from './player.js';

export const players = {
    A: new Player('player-A', 10*60*1000),
    B: new Player('player-B', 10*60*1000)
};

export const intervalId = {
    A: null,
    B: null
};

export const timeLeftBox = {
    A: document.querySelector('#player-A .time-left'),
    B: document.querySelector('#player-B .time-left')
};

export const movesBox = {
    A: document.querySelector('#player-A .moves'),
    B: document.querySelector('#player-B .moves')
};

export const buttons = {
    fullscreen: document.getElementById('fullscreen-button'),
    reset: document.getElementById('reset-button'),
    play: document.getElementById('play-button'),
    saveTimer: document.getElementById('save-time'),
    cancelTimer: document.getElementById('cancel-timer'),
    timeAdjustButtons: document.getElementsByClassName('time-adjust-button')
    // settings: document.getElementById('settings-button'),
    // mute: document.getElementById('mute-button')
};

export const adjustTimer = {
    hour: document.getElementById('hour-select'),
    minute: document.getElementById('minute-select'),
    second: document.getElementById('second-select')
};

export const presetTime = [{
    title: "30 sec",
    totalTime: 30 * 1000,
    increment: 0
},
    {
        title: "1 min",
        totalTime: 60 * 1000,
        increment: 0
    },
    {
        title: "1 min | 1 sec",
        totalTime: 60 * 1000,
        increment: 1000
    },
    {
        title: "2 min",
        totalTime: 2 * 60 * 1000,
        increment: 0
    },
    {
        title: "2 min | 1 sec",
        totalTime: 2 * 60 * 1000,
        increment: 1000
    },
    {
        title: "3 min",
        totalTime: 3 * 60 * 1000,
        increment: 0
    },
    {
        title: "3 min | 2 sec",
        totalTime: 3 * 60 * 1000,
        increment: 2000
    },
    {
        title: "5 min",
        totalTime: 5 * 60 * 1000,
        increment: 0
    },
    {
        title: "5 min | 5 sec",
        totalTime: 5 * 60 * 1000,
        increment: 5000
    },
    {
        title: "10 min",
        totalTime: 10 * 60 * 1000,
        increment: 0
    },
    {
        title: "15 min | 10 sec",
        totalTime: 15 * 60 * 1000,
        increment: 10000
    },
    {
        title: "30 min",
        totalTime: 30 * 60 * 1000,
        increment: 0
    },
    {
        title: "60 min",
        totalTime: 60 * 60 * 1000,
        increment: 0
    }];
    