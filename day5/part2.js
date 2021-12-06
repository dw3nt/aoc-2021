const { input } = require("./input");

var ventPos = {};

function getVentPosKey(coord) {
    return coord[0].toString() + "." + coord[1].toString();
}

function increaseCountAtPosition(ventPosKey) {
    if (! (getVentPosKey(ventPosKey) in ventPos )) {
        ventPos[getVentPosKey(ventPosKey)] = 0;
    }
    ventPos[getVentPosKey(ventPosKey)] += 1;
}

input.forEach((coordPair) => {
    let startPos = coordPair[0];
    let endPos = coordPair[1];

    if(startPos[0] === endPos[0]) {         // row matches
        for(let i = 0; i <= Math.abs(endPos[1] - startPos[1]); i++) {
            increaseCountAtPosition( [startPos[0],  startPos[1] + (i * Math.sign(endPos[1] - startPos[1])) ] );
        }

    } else if(startPos[1] === endPos[1]) {  // col matches
        for(let i = 0; i <= Math.abs(endPos[0] - startPos[0]); i++) {
            increaseCountAtPosition( [ startPos[0] + (i * Math.sign(endPos[0] - startPos[0])), startPos[1] ] );
        }
    } else {                                // diagonals
        for(let i = 0; i <= Math.abs(endPos[0] - startPos[0]); i++) {
            increaseCountAtPosition( [ startPos[0] + (i * Math.sign(endPos[0] - startPos[0])), startPos[1] + (i * Math.sign(endPos[1] - startPos[1])) ] );
        }
    }
});

let dangerSpotCount = 0;
let ventPosVals = Object.values(ventPos);
for(let i=0; i<ventPosVals.length; i++) {
    if (ventPosVals[i] >= 2) {
        dangerSpotCount += 1;
    }
}

console.log(dangerSpotCount);