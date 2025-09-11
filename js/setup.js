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
  play: document.getElementById('play-button')
 // settings: document.getElementById('settings-button'),
 // mute: document.getElementById('mute-button')
};
