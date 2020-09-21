
const produceAnimateDeg = (deg, _iteration) => {
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

export default produceAnimateDeg;