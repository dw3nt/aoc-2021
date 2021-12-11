const { input } = require("./input");

var flashes = 0;

function flashAtPos(pos) {
    input[pos[0]][pos[1]] = -1;
    flashes++;
    for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
        for (let colOffset = -1; colOffset < 2; colOffset++) {
            let newRow = pos[0] + rowOffset;
            let newCol = pos[1] + colOffset;

            if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
                if (input[newRow][newCol] > -1) {
                    input[newRow][newCol] += 1;
                    if (input[newRow][newCol] > 9) {
                        flashAtPos([newRow, newCol]);
                    }
                }
            }
        }
    }
}

for (let step = 0; step < 100; step++) {
    for (let row=0; row<input.length; row++) {
        for (let col=0; col<input[0].length; col++) {
            if (input[row][col] > -1) {
                input[row][col] += 1;
                if (input[row][col] > 9) {
                    flashAtPos([row, col]);
                    input[row][col] = -1;
                }
            }
        }
    }

    for (let row=0; row<input.length; row++) {
        for (let col=0; col<input[0].length; col++) {
            if (input[row][col] == -1) {
                input[row][col] = 0;
            }
        }
    }
}

console.log(flashes);