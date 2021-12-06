const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);

let inputFile = (args.length >= 1 ? args[0] : "input.txt");
let maxDays = (args.length >= 2 ? parseInt(args[1]) : 80);

const input = fs.readFileSync(path.resolve(__dirname, inputFile), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return "0";
    }

    return data;
}).toString().trim().split(",").map((num) => parseInt(num));

module.exports ={
    input,
    maxDays
};