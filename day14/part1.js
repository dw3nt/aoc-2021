const { template, insertPairs, maxSteps } = require("./input");

let polymer = template;
for (let step = 0; step < maxSteps; step++) {
    let newTemplate = polymer;
    let insertedChars = 0;
    for (let pair = 0; pair < polymer.length - 1; pair++) {
        let subString = polymer.substring(pair, pair + 2);
        if (Object.keys(insertPairs).includes(subString)) {
            newTemplate = newTemplate.slice(0, insertedChars + pair + 1) + insertPairs[subString] + newTemplate.slice(insertedChars + pair + 1);
            insertedChars++;
        }
    }
    polymer = newTemplate;
}

let counts = {};
for (let offset = 0; offset < polymer.length; offset++) {
    counts[polymer.charAt(offset)] = counts[polymer.charAt(offset)] ? counts[polymer.charAt(offset)] + 1 : 1;
}

let result = Math.max(...Object.values(counts)) - Math.min(...Object.values(counts));
console.log(result);