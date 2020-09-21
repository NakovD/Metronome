import BPMCalc from './BPMCalculator.js';
const container = document.querySelector('.container');
const weight = document.querySelector(".weight");
const counter = document.querySelector('.counter');

let mousedown = false;
let y = 0;



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


export default weight;