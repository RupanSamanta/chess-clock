const players = {
    A: {
        elem: document.getElementById('player-A'),
        moves: 0,
        time: 10*60*1000, // in milliseconds
        active: false
    }, 
    B: {
        elem: document.getElementById('player-B'),
        moves: 0,
        time: 10*60*1000,
        active: false
    }
};
const buttons = {
    fullscreen: document.getElementById('fullscreen-button'),
    reset: document.getElementById('reset-button'),
    play: document.getElementById('play-button'),
    settings: document.getElementById('settings-button'),
    mute: document.getElementById('mute-button')
};

players.A.elem.addEventListener(function() {
    this.classList.remove('active-player');
    players.B.add()
});

players.A.elem.addEventListener(function() {
    
});
