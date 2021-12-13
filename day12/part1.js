const { input } = require("./input");

function initPointMap() {
    let map = {};
    input.forEach((path) => {
        for (let i=0; i<path.length; i++) {
            if (!Object.keys(map).includes(path[i])) {
                map[path[i]] = [];     
            }
        }
    
        map[path[0]].push(path[1]);
        map[path[1]].push(path[0]);
    });

    return map;
}

function initSkipables() {
    let skip = ["start"];

    Object.keys(pointMap).forEach((key) => {
        if (pointMap[key].length === 1) {
            if (pointMap[key][0] == pointMap[key][0].toLowerCase()) {
                skip.push(key);
            }
        }
    });

    return skip;
}

function countPaths(mapKey, path) {
    path.push(mapKey);
    let count = 0;
    pointMap[mapKey].forEach((room) => {
        if (!skipables.includes(room)) {
            if (room === "end") {
                path.push("end");
                count++;
            } else if (room != room.toLowerCase() || (room == room.toLowerCase() && !path.includes(room))) {
                count += countPaths(room, [...path]);
            }
        }
    });

    return count;
}

var pointMap = initPointMap();
var skipables = initSkipables();

let count = countPaths('start', []);
console.log(count);