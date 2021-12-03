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

function calculateRates(counts) {
    var gammaStr = "";
    var epsilonStr = "";
    counts.forEach((count) => {
        if(count > (input.length / 2)) {
            gammaStr += "1";
            epsilonStr += "0";
        } else {
            gammaStr += "0";
            epsilonStr += "1";
        }
    });

    return [ parseInt(gammaStr, 2), parseInt(epsilonStr, 2) ];
}

var bitCounts = countOneBits()
var rates = calculateRates(bitCounts);
console.log(rates[0] * rates[1]);