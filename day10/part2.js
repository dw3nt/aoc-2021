const { input } = require("./input");
const openCloseMap = { '(': ')', '[': ']', '{': '}', '<': '>' };
const illegalCharPoints = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
const completeCharPoints = { ')': 1, ']': 2, '}': 3, '>': 4 };

let syntaxScore = 0;
let completeScores = [];

let invalidsFound = [];
let openChunks = [];

input.forEach((line) => {
    openChunks = [];
    let foundInvalid = false;
    for(let i=0; i<line.length; i++) {
        let char = line.charAt(i);
        if (Object.keys(openCloseMap).includes(char)) {
            openChunks.push(char);
        } else if (Object.values(openCloseMap).includes(char)) {
            if (openChunks.length > 0) {
                let lastOpen = openChunks.pop();
                if (openCloseMap[lastOpen] != char) {
                    invalidsFound.push(char);
                    foundInvalid = true;
                    break;
                }
            } else {
                console.log("Can't start with a closing character: " + char);
            }
        }
    }

    if (!foundInvalid) {
        let closingString = '';
        openChunks.reverse().forEach((char) => {
            closingString = closingString + openCloseMap[char];
        });

        let completeScore = 0;
        for (let i=0; i<closingString.length; i++) {
            completeScore *= 5;
            completeScore += completeCharPoints[closingString.charAt(i)];
        }
        completeScores.push(completeScore);
    }
});

invalidsFound.forEach((char) => {
    syntaxScore += illegalCharPoints[char];
});

completeScores.sort((a, b) => { return a - b; });
console.log(completeScores[Math.floor(completeScores.length / 2)]);