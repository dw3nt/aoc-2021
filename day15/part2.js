const { cp } = require("fs");
const { input } = require("./input");
const Node = require("./Node.js");

const MAX_SIZE = 5;

function getLowestCostFromSet(set) {
    let lowestIndex = 0;
    for (let i = 0; i< set.length; i++) {
        if (set[i].cost < set[lowestIndex].cost) {
            lowestIndex = i;
        }
    }

    return set[lowestIndex];
}

function aStar(start, goal) {
    let openSet = [ start ];
    let closedSet = [];

    while (openSet.length > 0) {
        let current = getLowestCostFromSet(openSet);

        if (current == goal) {
            return current.backTracePath();
        } else {
            let currentIndex = openSet.indexOf(current);
            openSet.splice(currentIndex, 1);
            closedSet.push(current);

            current.addNeighbors(grid);
            for (let i = 0; i < current.neighbors.length; i++) {
                let neighbor = current.neighbors[i];
                if (!closedSet.includes(neighbor)) {
                    let tempCost = current.cost + neighbor.cost;
                    if (openSet.includes(neighbor)) {
                        if (tempCost < neighbor.cost) {
                            neighbor.cost = tempCost;
                        }
                    } else {
                        neighbor.cost = tempCost;
                        openSet.push(neighbor);
                    }

                    neighbor.goalEstimate = neighbor.distanceTo(goal);
                    neighbor.previous = current;
                }
            }
        }
    }

    return false;
}

var grid = [];
let rowLen = input.length;
let colLen = input[0].length;
for (let gridRow = 0; gridRow < rowLen * MAX_SIZE; gridRow++) {
    grid.push([]);
    for (let gridCol = 0; gridCol < colLen * MAX_SIZE; gridCol++) {
        let cost = input[gridRow % rowLen][gridCol % colLen];
        let rowRepeat = Math.floor(gridRow / rowLen);
        let colRepeat = Math.floor(gridCol / colLen);
        cost += rowRepeat + colRepeat;
        cost = cost % 9 == 0 ? 9 : cost % 9;
        grid[gridRow].push(new Node(gridRow, gridCol, cost));
    }
}

let start = grid[0][0];
let end = grid[grid.length - 1][grid[0].length - 1];
start.cost = 0;

let path = aStar(start, end);
if (path) {
    console.log(end.cost);
} else {
    console.log("no path found!");
}