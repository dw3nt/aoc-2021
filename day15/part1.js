const { input } = require("./input");
const Node = require("./Node.js");

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
    let cameFrom = null;

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
for (let row = 0; row < input.length; row++) {
    grid.push([]);
    for (let col = 0; col < input[row].length; col++) {
        grid[row].push(new Node(row, col, input[row][col]));
    }
}

let start = grid[0][0];
let end = grid[input.length - 1][input[0].length - 1];
start.cost = 0;

let path = aStar(grid[0][0], grid[input.length - 1][input[0].length - 1], 0);
if (path) {
    console.log(end.cost);
} else {
    console.log("no path found!");
}