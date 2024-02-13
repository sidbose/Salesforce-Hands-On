import { LightningElement } from 'lwc';

export default class Timer extends LightningElement {

    time = '0:0:0';
    started = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    intervalID;

    startTimer() {
        this.intervalID = setInterval(() => {
            this.started = true;
            this.seconds++;
            this.minutes = Math.floor(this.seconds / 60);
            this.hours = Math.floor(this.minutes / 60);
            this.time = this.hours + ':' + this.minutes + ':' + this.seconds;
        }, 1000);
    }

    resetTimer() {
        this.time = '0:0:0';
        this.started = false;
        clearInterval(this.intervalID);
        this.hours, this.minutes, this.seconds = 0;
    }

    StopTimer() {
        clearInterval(this.intervalID);
        started = false;
    }
}