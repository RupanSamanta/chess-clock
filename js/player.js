export default class Player {
    constructor(id, initTime = 10000, increment = 0) {
        this.elem = document.getElementById(id);
        this.moves = 0;
        this.timeLeft = initTime; // in ms
        this.active = false;
        this.timeUp = false;
        this.increment = increment; // per move increment
    }

    startTurn() {
        this.active = true;
    }

    endTurn() {
        this.active = false;
        this.moves++;
        this.timeLeft += this.increment;
    }

    updateTime(delta = 1000) {
        if (!this.active || this.timeUp) return;

        this.timeLeft -= delta;

        if (this.timeLeft <= 0) {
            this.timeLeft = 0;
            this.timeUp = true;
        }
    }
}