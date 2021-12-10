const { input } = require("./input");
const directions = [ [1, 0], [-1, 0], [0, 1], [0, -1] ];

var positionsChecked = [];
let basinSize = [];

function checkForBasinPoint(y, x, dir) {
    let size = 1;

    if (y < 0 || y >= input.length || x < 0 || x >= input[0].length || input[y][x] === 9) {
        return 0;
    }

    for (let i = 0; i < directions.length; i++) {
        let newX = directions[i][0] + x;
        let newY = directions[i][1] + y;
        if (!checkForPositionInArray(positionsChecked, [newY, newX])) {
            positionsChecked.push([newY, newX]);
            if (directions[i].join("") != dir.join("")) {
                let prevDirection = [
                    directions[i][0] != 0 ? directions[i][0] * -1 : 0, 
                    directions[i][1] != 0 ? directions[i][1] * -1 : 0,
                ];
    
                size += checkForBasinPoint(newY, newX, prevDirection);
            }
        }  
    }

    return size;
}

function checkForPositionInArray(arr, pos) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == pos[0] && arr[i][1] == pos[1]) {
            return true;
        }
    }

    return false;
}

function removeSmallestElement(arr) {
    let min = Math.min(...arr);
    return arr.filter( element => element != min);
}

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
            positionsChecked = [ [y, x] ];
            basinSize.push(checkForBasinPoint(y, x, [0, 0]));
            if (basinSize.length > 3) {
                basinSize = removeSmallestElement(basinSize);
            }
        }
    }
}

let product = basinSize.reduce((partial, num) => partial * num);
console.log(product);