const { input } = require("./input");

let digitCount = { 2: 0, 3: 0, 4: 0, 7: 0 };
input.forEach((data) => {
    data.outputs.forEach((output) => {
        if (output.length in digitCount) {
            digitCount[output.length] += 1;
        }
    });
});

console.log(Object.values(digitCount).reduce( (prev, curr) => prev + curr ));