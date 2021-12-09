const { input } = require("./input");
const directions = [ [1, 0], [-1, 0], [0, 1], [0, -1] ];

var riskTotal = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        let isLowest = true;
        let level = input[y][x];

        checkDirs:
            for (let i = 0; i < directions.length; i++) {
                let newX = directions[i][0] + x;
                let newY = directions[i][1] + y;

                if (newX >= 0 && newX < input[y].length && newY >= 0 && newY < input.length) {
                    if (level >= input[newY][newX]) {
                        isLowest = false;
                        break checkDirs;
                    }
                }
            }

        if (isLowest) {
            riskTotal += level + 1;
        }
    }
}

console.log(riskTotal);