const { input, maxDays } = require("./input");

var fishTimers = input;
for (let days = 0; days < maxDays; days++) {
    let newFish = 0;
    for (let index = 0; index < fishTimers.length; index++) {
        fishTimers[index]--;
        if(fishTimers[index] < 0) {
            fishTimers[index] = 6;
            newFish++;
        }
    }
    fishTimers = fishTimers.concat(Array(newFish).fill(8));
}

console.log(fishTimers.length);