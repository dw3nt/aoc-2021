const { input } = require("./input");

function countOneBits() {
    let oneCounts = [];
    for(let i=0; i<input[0].length; i++) {
        oneCounts.push(0);
    }

    input.forEach((binaryStr) => {
        for(let i=0; i<binaryStr.length; i++) {
            if(parseInt(binaryStr.charAt(i)) === 1) {
                oneCounts[i] += 1
            }
        }
    });
    
    return oneCounts;
}

function calculateGammaRate(counts) {
    var gammaStr = "";
    counts.forEach((count) => {
        if(count > (input.length / 2)) {
            gammaStr += "1";
        } else {
            gammaStr += "0";
        }
    });

    return parseInt(gammaStr, 2);
}

var bitCounts = countOneBits()
var gammaRate = calculateGammaRate(bitCounts);
var epsilonRate = ~gammaRate & (1 << bitCounts.length) - 1;

console.log(gammaRate * epsilonRate);