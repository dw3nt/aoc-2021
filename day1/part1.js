const { input } = require("./input");

var increaseCount = 0;
for ( var index = 0; index < input.length; index++) {
    var prevIndex = index - 1;
    if (prevIndex >= 0) {
        if (input[prevIndex] < input[index]) {
            increaseCount++;
        }
    }
}

console.log(increaseCount);