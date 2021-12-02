const { input } = require("./input");

const FORWARD = "forward";
const DOWN = "down";
const UP = "up";

var forwardDistance = 0;
var depth = 0;
input.forEach(instruction => {
    switch (instruction.direction) {
        case FORWARD:
            forwardDistance += instruction.distance;
            break;
        case DOWN:
            depth += instruction.distance;
            break;
        case UP:
            depth -= instruction.distance;
            break;
        default:
            console.log("unrecognized direction: " + instruction.direction);
    }
});

console.log(forwardDistance * depth);