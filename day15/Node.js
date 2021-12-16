class Node {
    row;
    col;
    cost;
    goalEstimate;

    previous = null;
    neighbors = [];

    constructor(row, col, cost) {
        this.row = row;
        this.col = col;
        this.cost = cost;
    }

    distanceTo(node) {
        return (node.row - this.row) + (node.col - this.col);
    }

    addNeighbors(grid) {
        let rowSize = grid.length;
        let colSize = grid[0].length;
        
        if (this.row - 1 >= 0) {
            this.neighbors.push(grid[ this.row - 1 ][ this.col ]);
        }
        if (this.row + 1 < rowSize) {
            this.neighbors.push(grid[ this.row + 1 ][ this.col ]);
        }

        if (this.col - 1 >= 0) {
            this.neighbors.push(grid[ this.row ][ this.col - 1 ]);
        }
        if (this.col + 1 < colSize) {
            this.neighbors.push(grid[ this.row ][ this.col + 1 ]);
        }
    }

    backTracePath() {
        let path = [];
        let temp = this;
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }

        return path;
    }
}

module.exports = Node;