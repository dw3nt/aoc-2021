const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);

var inputFile = "input.txt";
if (args.length) {
    inputFile = args[0];
}

var inputData = {
    "numbers": [],
    "boards": []
};
const input = fs.readFileSync(path.resolve(__dirname, inputFile), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return "0";
    }

    return data;
}).toString().trim().split("\n");

inputData.numbers = input[0].split(",");

var board = [];
for(let i = 1; i < input.length; i++) {
    if(input[i] !== "") {
        board.push(input[i].split(" ").filter(((element) => element)).map((element) => parseInt(element)));
    }

    if ((input[i] === "" || i === input.length - 1) && board.length > 0) {
        inputData.boards.push(board);
        board = [];
    }
}

module.exports ={
    inputData
};