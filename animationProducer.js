
const produceAnimateDeg = (deg, _iteration) => {
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

    const zeroTo60 = positive.concat(positiveBackward);
    const negativeZeroTo60 = negative.concat(negativeBackward);
    const finalResult = zeroTo60.concat(negativeZeroTo60).filter((el, i) => el[i] !== el);
    return finalResult;
};

export default produceAnimateDeg;