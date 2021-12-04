const { input } = require("./input");

function filterBinariesAtBitPosition(binaries, position, mostCommon = true) {
    if(binaries.length === 1) {
        return binaries;
    }

    var oneAtPos = [];
    var zeroAtPos = [];
    binaries.forEach((binary, index) => {
        if(parseInt(binary.charAt(position)) === 1) {
            oneAtPos.push(binary);
        } else {
            zeroAtPos.push(binary);
        }
    });

    if(oneAtPos.length > zeroAtPos.length || oneAtPos.length == zeroAtPos.length) {
        return mostCommon ? oneAtPos : zeroAtPos;
    } else {
        return mostCommon ? zeroAtPos : oneAtPos;
    }
}

let oxygenRate = input;
for(let i=0; i<input[0].length; i++) {
    oxygenRate = filterBinariesAtBitPosition(oxygenRate, i, true);
}
oxygenRate = parseInt(oxygenRate[0], 2);

let c02Rate = input;
for(let i=0; i<input[0].length; i++) {
    c02Rate = filterBinariesAtBitPosition(c02Rate, i, false);
}
c02Rate = parseInt(c02Rate[0], 2);

console.log(oxygenRate * c02Rate);