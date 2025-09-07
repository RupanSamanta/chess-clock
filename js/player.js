export default class Player {
    constructor(id, initTime = 10000, increment = 0) {
        this.elem = document.getElementById(id);
        this.moves = 0;
        this.timeLeft = initTime; // in ms
        this.active = false;
        this.timeUp = false;
        this.increment = increment; // per move increment
       // this.lastUpdate = null;
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
       /* const now = new Date();
        const elapsed = now - this.lastUpdate;*/
        this.timeLeft -= 1000;
        //this.lastUpdate = now;
        if (this.timeLeft <= 0) {
            this.timeUp = true;
            return;
        }
    }
    isStartMove() {
        return (this.moves == 0 && !this.active);
    }
}