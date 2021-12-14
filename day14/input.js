const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);

let inputFile = (args.length >= 1 ? args[0] : "input.txt");
let maxSteps = (args.length >= 2 ? parseInt(args[1]) : 10);

let template = "";
let insertPairs = {};
const data = fs.readFileSync(path.resolve(__dirname, inputFile), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return "0";
    }

    return data;
}).toString().trim().split("\n").map((line) => {
    if (line !== "") {
        if (line.includes("->")) {
            let data = line.split(" -> ");
            insertPairs[data[0]] = data[1];
        } else {
            template = line;
        }
    }
});

module.exports ={
    template,
    insertPairs,
    maxSteps
};