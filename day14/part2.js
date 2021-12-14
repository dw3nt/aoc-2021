const { template, insertPairs, maxSteps } = require("./input");

let pairCounts = {};
let insertKeys = Object.keys(insertPairs);
for (let index = 0; index < insertKeys.length; index++) {
    pairCounts[insertKeys[index]] = pairCounts[insertKeys[index]] ? pairCounts[insertKeys[index]] + 1 : 0

    let regex = new RegExp(insertKeys[index], "gi");
    let result;
    while ( result = regex.exec(template) ) {
        pairCounts[insertKeys[index]] += 1;
    }
}

let letterCounts = {};
for (let index = 0; index < template.length; index++) {
    letterCounts[template.charAt(index)] = letterCounts[template.charAt(index)] ? letterCounts[template.charAt(index)] + 1 : 1;
}

let pair;
let pairsToAdd;
for (let step = 0; step < maxSteps; step++) {
    pairsToAdd = {};
    for (let index = 0; index < insertKeys.length; index++) {
        pair = insertKeys[index];
        let insertChar = insertPairs[pair];
        
        if (pairCounts[pair] > 0) {
            let key1 = pair.charAt(0) + insertChar;
            let key2 = insertChar + pair.charAt(1);

            pairsToAdd[key1] = pairsToAdd[key1] ? pairsToAdd[key1] + pairCounts[pair] : pairCounts[pair];
            pairsToAdd[key2] = pairsToAdd[key2] ? pairsToAdd[key2] + pairCounts[pair] : pairCounts[pair];

            if ( (insertChar != pair.charAt(0) && insertChar != pair.charAt(1) ) || (pair == key1 || pair == key2) ) {
                pairsToAdd[pair] = pairsToAdd[pair] ? pairsToAdd[pair] - pairCounts[pair] : -pairCounts[pair];
            }

            letterCounts[insertChar] = letterCounts[insertChar] ? letterCounts[insertChar] + pairCounts[pair] : pairCounts[pair];
        }
    }

    for (let index = 0; index < Object.keys(pairsToAdd).length; index++) {
        pair = Object.keys(pairsToAdd)[index];
        pairCounts[pair] += pairsToAdd[pair];
    }
}

let result = Math.max(...Object.values(letterCounts)) - Math.min(...Object.values(letterCounts));
console.log(result);