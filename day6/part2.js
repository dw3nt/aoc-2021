const { input, maxDays } = require("./input");

let fishCounts = Array(9).fill(0);
for (let index = 0; index < input.length; index++) {
    fishCounts[input[index]]++;
}

for (let day = 0; day < maxDays; day++) {
    zeroes = fishCounts[0];
    for (let count = 0; count < fishCounts.length; count++) {
        if (count < 8) {
            fishCounts[count] = fishCounts[count + 1];
        }
    }

    fishCounts[6] += zeroes;
    fishCounts[8] = zeroes;
}

let sum = fishCounts.reduce((partial, num) => partial + num);
console.log(fishCounts);
console.log(sum)