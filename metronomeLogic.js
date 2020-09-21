import keyFramesProducer from './animationProducer.js';
import weight from './weightEvents.js';
import BPMCalc from './BPMCalculator.js';

const container = document.querySelector('.container');
const arm = document.querySelector(".arm");
//metronome arm;
const startBttn = document.querySelector(".start");
const stopBttn = document.querySelector(".stop");
//buttons;
let audio = new Audio('tick.mp3');
let intervalFunc;
//other vars which i use to move the metronome;

let animationObj = null;

function startSpinning() {
    container.style = 'pointer-events: none;';          
    const dataForSpin = BPMCalc(weight.getBoundingClientRect());            //get the BPM;
    const interval =  60 / dataForSpin.BPM;       
    intervalFunc = setInterval(() => {
        audio.play();
    }, interval * 1000);
    const keyFrames = keyFramesProducer(dataForSpin.degree, 1);             //produce the animation
    animationObj = arm.animate(keyFrames, { iterations: Infinity, delay: 10, duration: interval * 2000, fill: "forwards" });
}

startBttn.addEventListener('click', startSpinning);

stopBttn.addEventListener('click', () => {
    if (!animationObj) { return };
    animationObj.cancel();
    clearInterval(intervalFunc);
    container.style = 'pointer-events: auto;';
});