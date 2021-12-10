const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);

var inputFile = "input.txt";
if (args.length) {
    inputFile = args[0];
}

const input = fs.readFileSync(path.resolve(__dirname, inputFile), "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return "0";
    }

    return data;
}).toString().trim().split("\n");

module.exports ={
    input
};