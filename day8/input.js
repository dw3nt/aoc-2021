const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);

let inputFile = (args.length >= 1 ? args[0] : "input.txt");

const inputData = fs.readFileSync(path.resolve(__dirname, inputFile), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return "0";
    }

    return data;
}).toString().trim().split("\n");

let input = [];
inputData.forEach((lineData) => {
    splitData = lineData.split(" | ");
    input.push({
        "signals": splitData[0].trim().split(" "),
        "outputs": splitData[1].trim().split(" ")
    });
});

module.exports ={
    input
};