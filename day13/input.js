const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);

var inputFile = "input.txt";
if (args.length) {
    inputFile = args[0];
}

let input = [];
let folds = [];
const data = fs.readFileSync(path.resolve(__dirname, inputFile), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return "0";
    }

    return data;
}).toString().trim().split("\n").map((line) => {
    if (line !== "") {
        if (line.includes(",")) {
            input.push(line.split(",").map((num) => parseInt(num)));
        } else if (line.includes("=")) {
            let foldData = line.split("=");
            folds.push({
                "axis": foldData[0].slice(-1),
                "mag": parseInt(foldData[1])
            });
        }
    }
});

module.exports ={
    input,
    folds
};