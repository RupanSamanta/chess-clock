export default class Player {
    constructor(id, initTime = 10000, increment = 0) {
        this.elem = document.getElementById(id);
        this.moves = 0;
        this.totalTime = initTime;
        this.timeLeft = initTime; // in ms
        this.active = false;
        this.timeUp = false;
        this.increment = increment; // per move increment
        this.lastUpdate = null;
    }

    startTurn() {
        this.active = true;
        this.lastUpdate = new Date();
    }

    endTurn() {
        this.active = false;
        this.moves++;
        this.timeLeft += this.increment;
    }

    updateTime() {
        if (!this.active) return;
        const now = new Date();
        const elapsed = now - this.lastUpdate;
        this.timeLeft -= elapsed;
        this.lastUpdate = now;
        if (this.timeLeft <= 0) {
            this.timeUp = true;
            return;
        }
    }
    reset() {
        this.moves = 0;
        this.timeLeft = this.totalTime;
        this.active = false;
        this.timeUp = false;
        this.lastUpdate = null;
    }
}