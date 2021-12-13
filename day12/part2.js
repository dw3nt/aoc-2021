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

    for (let i=0; i<Object.keys(map).length; i++) {
        let key = Object.keys(map)[i];
        let points = map[key];
        points.push(points.splice(points.indexOf("end"), 1)[0]);
        map[key] = points;        
    }

    return map;
}

function canVisitRoom(room, path) {
    path.push(room);
    if (room != room.toLowerCase()) {
        return true;
    } else {
        let counts = {};
        for (let i=0; i<path.length; i++) {
            counts[path[i]] = counts[path[i]] ? counts[path[i]] + 1 : 1;
        }

        let visitedSmallTwice = false;
        for (let i=0; i<Object.values(counts).length; i++) {
            let currentRoom = Object.keys(counts)[i];
            let roomCount = counts[currentRoom];

            if (roomCount > 2 && currentRoom == currentRoom.toLowerCase()) {
                return false;
            } else if (roomCount == 2 && currentRoom == currentRoom.toLowerCase()) {
                if (!visitedSmallTwice) {
                    visitedSmallTwice = true;
                } else {
                    return false;
                }
            }
        }

        return true;
    }
}

function countPaths(mapKey, path) {
    path.push(mapKey);
    let count = 0;
    for (let i=0; i<pointMap[mapKey].length; i++) {
        let room = pointMap[mapKey][i];
        if (!skipables.includes(room)) {
            if (room === "end") {
                path.push("end");
                count++;
                // console.log(path);
            } else if (canVisitRoom(room, [...path])) {
                count += countPaths(room, [...path]);
            }
        }
    }

    return count;
}

var pointMap = initPointMap();
var skipables = ["start"];

let count = countPaths('start', []);
console.log(count);