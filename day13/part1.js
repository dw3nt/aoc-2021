const { input, folds } = require("./input");

let colMax = 0;
let rowMax = 0;

input.forEach((coords) => {
    if (coords[0] > colMax) {
        colMax = coords[0];
    }
    if (coords[1] > rowMax) {
        rowMax = coords[1];
    }
});


let paper = [];
for (let row = 0; row < rowMax + 1; row++) {
    paper.push([]);
    for (let col = 0; col < colMax + 1; col++) {
        paper[row].push(".");
    }
}

input.forEach((dotCoord) => {
    paper[dotCoord[1]][dotCoord[0]] = "#";
});

let fold = folds[0];
let foldMag = fold.mag;

switch (fold.axis) {
    case "y":
        for (let row = 1; row <= rowMax / 2; row++) {
            for (let col = 0; col < colMax + 1; col++) {
                if (paper[foldMag + row][col] == "#" || paper[foldMag - row][col] == "#") {
                    paper[foldMag - row][col] = "#";
                }
            }
        }

        paper = paper.splice(0, foldMag);
        rowMax = paper.length - 1;
        break;

    case "x":
        for (let row = 0; row < rowMax + 1; row++) {
            for (let col = 1; col <= colMax / 2; col++) {
                if (paper[row][foldMag + col] == "#" || paper[row][foldMag - col] == "#") {
                    paper[row][foldMag - col] = "#";
                }
            }
        }

        for (let row = 0; row < rowMax + 1; row ++) {
            paper[row] = paper[row].splice(0, foldMag);
        }
        colMax = paper[0].length;
        break;
}

let dotCount = 0;
for (let row = 0; row < paper.length; row++) {
    for (let col = 0; col < paper[0].length; col++) {
        if (paper[row][col] == "#") {
            dotCount ++;
        }
    }
}

console.log(dotCount);