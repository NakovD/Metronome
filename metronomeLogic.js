//metronome elements
const arm = document.querySelector(".arm");
const container = document.querySelector('.container');
const weight = document.querySelector(".weight");
//controls
const startBttn = document.querySelector(".start");
const stopBttn = document.querySelector(".stop");
//other
let audio = new Audio('tick.mp3');
let intervalFunc;
let animationObj = null;
let moving = false;

//weight move logic(events and calculating the BPM based on the position of the weight);
let mousedown = false;
let y = 0;
const counter = document.querySelector('.counter');
function moveWeight(e) {
    if (mousedown) {
        if (e.clientY + y < 30 || e.clientY + y > 410) {
            mousedown = false;
            return;
        }
        weight.style.top = e.clientY + y + 'px';
        return;
    }
}

weight.addEventListener('mousedown', (e) => {
    mousedown = true;
    y = weight.offsetTop - e.clientY;
});

container.addEventListener('mousemove', moveWeight);
weight.addEventListener('mousemove', moveWeight);

container.addEventListener('mouseup', e => {
    mousedown = false;
    counter.textContent = BPMCalc(weight.getBoundingClientRect()).BPM;
});

weight.addEventListener('mouseup', e => {
    mousedown = false;
    counter.textContent = BPMCalc(weight.getBoundingClientRect()).BPM;
});

//BPM Calculations;
const minBPM = 30;
const maxBPM = 218;

function convertRange(value, r1, r2) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

function BPMCalc(position) { //This func calculates the actual BPM based on the vertical position
    const y = position.y;                                                         // of the weight on the arm;
    const middle = y + 50;
    const minArmPosition = 100;
    const maxArmPosition = 480;
    const BPM = Math.round(convertRange(middle, [minArmPosition, maxArmPosition], [minBPM, maxBPM]));
    const result = { BPM, degree: null };
    
    if (BPM > 150) {
        result.degree = 20;
    }else if (BPM > 0) {
        result.degree = 40;
    }
    return result;
};


//actual animation;
function keyFramesProducer (deg, _iteration) {
    //This function creates animation; This animation starts from 0, goes to specific degree,
    //then back to 0, and continues until the negative value of the specific degree;
    const positive = [];
    const positiveBackward = [];
    const negative = [];
    const negativeBackward = [];
    const degree = +deg;
    const iteration = +_iteration;
    
    for (let i = 0; i <= degree; i += iteration) {
        if (degree - i !== 0) {
            positive.push({ transform: `rotate(${i}deg)` });
            positiveBackward.push({ transform: `rotate(${degree - i}deg)` })
            negative.push({ transform: `rotate(${-i}deg)` });
        }
        negativeBackward.push({ transform: `rotate(${-(degree - i)}deg)` });
    }

    const zeroToMax = positive.concat(positiveBackward);
    const negativeZeroToMax = negative.concat(negativeBackward);
    const finalResult = zeroToMax.concat(negativeZeroToMax);
    return finalResult;
};


//start the animation;
function startSpinning() {
    if (moving) {
        return;
    }
    moving = true;
    container.style = 'pointer-events: none;';          
    const dataForSpin = BPMCalc(weight.getBoundingClientRect());            //get the BPM;
    const interval =  60 / dataForSpin.BPM;       
    intervalFunc = setInterval(() => {
        audio.play();
    }, interval * 1000);
    const keyFrames = keyFramesProducer(dataForSpin.degree, 1);             //produce the animation
    animationObj = arm.animate(keyFrames, { iterations: Infinity, duration: interval * 2000, fill: "forwards" });
}

startBttn.addEventListener('click', startSpinning);

stopBttn.addEventListener('click', () => {
    if (!animationObj) { return };
    animationObj.cancel();
    clearInterval(intervalFunc);
    moving = false;
    container.style = 'pointer-events: auto;';
});





