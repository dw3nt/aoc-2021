const { input } = require("./input");
const openCloseMap = { '(': ')', '[': ']', '{': '}', '<': '>' };
const illegalCharPoints = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

let syntaxScore = 0;
let invalidsFound = [];
let openChunks = [];

input.forEach((line) => {
    openChunks = [];
    for(let i=0; i<line.length; i++) {
        let char = line.charAt(i);
        if (Object.keys(openCloseMap).includes(char)) {
            openChunks.push(char);
        } else if (Object.values(openCloseMap).includes(char)) {
            if (openChunks.length > 0) {
                let lastOpen = openChunks.pop();
                if (openCloseMap[lastOpen] != char) {
                    invalidsFound.push(char);
                    break;
                }
            } else {
                console.log("Can't start with a closing character: " + char);
            }
        }
    }
});

invalidsFound.forEach((char) => {
    syntaxScore += illegalCharPoints[char];
});

console.log(syntaxScore);