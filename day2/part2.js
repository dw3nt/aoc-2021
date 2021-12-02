const { input } = require("./input");

const FORWARD = "forward";
const DOWN = "down";
const UP = "up";

var forwardDistance = 0;
var depth = 0;
var aim = 0;

input.forEach(instruction => {
    switch (instruction.direction) {
        case FORWARD:
            forwardDistance += instruction.distance;
            depth += aim * instruction.distance;
            break;
        case DOWN:
            aim += instruction.distance;
            break;
        case UP:
            aim -= instruction.distance;
            break;
        default:
            console.log("unrecognized direction: " + instruction.direction);
    }
});

console.log(forwardDistance * depth);