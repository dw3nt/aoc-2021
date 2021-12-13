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

for (let i=0; i< folds.length; i++) {
    let foldMag = folds[i].mag;
    switch (folds[i].axis) {
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
}

console.log(paper);