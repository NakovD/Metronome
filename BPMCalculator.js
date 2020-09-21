
function convertRange(value, r1, r2) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

const BPMCalc = (position) => {
    const y = position.y;
    const middle = y + 50;
    const min = 100;
    const max = 480;
    const BPM = Math.round(convertRange(middle, [min, max], [30, 218]));
    const result = { BPM, degree: null };
    if (BPM > 150) {
        result.degree = 20;
    }else if (BPM > 0) {
        result.degree = 40;
    }
    return result;

};


export default BPMCalc;