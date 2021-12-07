const { input } = require("./input");

let leastFuel = -1;
let bestPosition = input[0];

let minPosition = Math.min(...input);
let maxPosition = Math.max(...input);

for (let positionToTry = minPosition; positionToTry <= maxPosition; positionToTry++) {
    let fuel = 0;
    input.forEach((position) => {
        let diff = Math.abs(positionToTry - position);
        fuel += ( (diff * diff) + diff) / 2;
    });

    if (fuel < leastFuel || leastFuel === -1) {
        leastFuel = fuel;
        bestPosition = positionToTry;
    }
}

console.log(leastFuel);