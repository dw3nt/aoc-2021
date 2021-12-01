const { input } = require("./input");
const windowSize = 3;

function getWindowSumByIndex(startIndex) {
    let windowValuesSum = 0;
    for (let i = 0; i < windowSize; i++) {
        if (startIndex + i < input.length) {
            windowValuesSum += input[startIndex + i];
        }
    }

    return windowValuesSum;
}

let increaseCount = 0;
for (let index = 0; index < input.length - (windowSize - 1); index++) {
    let prevWindowStartIndex = index - 1;

    if (prevWindowStartIndex >= 0) {
        if(getWindowSumByIndex(prevWindowStartIndex) < getWindowSumByIndex(index)) {
            increaseCount++;
        }
    }
}

console.log(increaseCount);