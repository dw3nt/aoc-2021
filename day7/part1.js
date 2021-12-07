const { input } = require("./input");

let leastFuel = -1;
let bestPosition = input[0];

input.forEach((positionToTry) => {
    let fuel = 0;
    input.forEach((position) => {
        fuel += Math.abs(positionToTry - position);
    });

    if (fuel < leastFuel || leastFuel === -1) {
        leastFuel = fuel;
        bestPosition = positionToTry;
    }
});

console.log(leastFuel);