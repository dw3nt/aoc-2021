const { input } = require("./input");
const lengthsWithOnePotential = [ 2, 3, 4, 7 ];
const numbersByLength = {
    2: [1],
    3: [7],
    4: [4],
    5: [2,3,5],
    6: [0,6,9],
    7: [8]
};
const numberSegments = [ 
    // top, top-left, top-right, middle, bottom-left, bottom-right, bottom
    [1, 1, 1, 0, 1, 1, 1],  // 0
    [0, 0, 1, 0, 0, 1, 0],  // 1
    [1, 0, 1, 1, 1, 0, 1],  // 2
    [1, 0, 1, 1, 0, 1, 1],  // 3
    [0, 1, 1, 1, 0, 1, 0],  // 4
    [1, 1, 0, 1, 0, 1, 1],  // 5
    [1, 1, 0, 1, 1, 1, 1],  // 6
    [1, 0, 1, 0, 0, 1, 0],  // 7
    [1, 1, 1, 1, 1, 1, 1],  // 8
    [1, 1, 1, 1, 0, 1, 1],  // 9
]

let total = 0;
input.forEach((data) => {
    let wireToSegmentMap = { "a": null,  "b": null,  "c": null,  "d": null,  "e": null,  "f": null,  "g": null, };
    let samplesByNumber = Array(10).fill([]);
    let samplesByLength = { 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };

    // fill in the easy ones
    data.signals.forEach((sample) => {
        samplesByLength[sample.length].push([...sample]);

        if (lengthsWithOnePotential.includes(sample.length)) {
            let number = numbersByLength[sample.length][0];
            samplesByNumber[number] = [...sample];
        }
    });

    // figure out wire letter for top segment
    let topSegmentWire = samplesByNumber[7].filter(letter => !samplesByNumber[1].includes(letter));
    wireToSegmentMap[topSegmentWire[0]] = 0;

    // bottom right segment
    let potentialBottomRights = samplesByNumber[7].filter(letter => samplesByNumber[1].includes(letter));
    if (samplesByLength[6][0].includes(potentialBottomRights[0]) && samplesByLength[6][1].includes(potentialBottomRights[0]) && samplesByLength[6][2].includes(potentialBottomRights[0])) {
        wireToSegmentMap[potentialBottomRights[0]] = 5;
        wireToSegmentMap[potentialBottomRights[1]] = 2;
    } else {
        wireToSegmentMap[potentialBottomRights[0]] = 2;
        wireToSegmentMap[potentialBottomRights[1]] = 5;
    }

    // top left
    let potentialMiddles = samplesByNumber[4].filter(letter => !samplesByNumber[1].includes(letter));
    if (samplesByLength[6][0].includes(potentialMiddles[0]) && samplesByLength[6][1].includes(potentialMiddles[0]) && samplesByLength[6][2].includes(potentialMiddles[0])) {
        wireToSegmentMap[potentialMiddles[0]] = 1;
        wireToSegmentMap[potentialMiddles[1]] = 3;
    } else {
        wireToSegmentMap[potentialMiddles[0]] = 3;
        wireToSegmentMap[potentialMiddles[1]] = 1;
    }

    // figure out bottom left
        // figure out which sample is 0, 6, and 9
    samplesByLength[6].forEach((sample) => {
        let filter = samplesByNumber[8].filter(letter => !sample.includes(letter))[0];

        switch (wireToSegmentMap[filter]) {
            case 2:     // missing top right, it's 6
                samplesByNumber[6] = sample;
                break;
            case 3:     // missing middle, it's 0
                samplesByNumber[0] = sample;
                break;
            case 4:     // missing bottom left, it's 9
            default:
                samplesByNumber[9] = sample;
                wireToSegmentMap[filter] = 4;
                break;
        }
    });

    Object.keys(wireToSegmentMap).forEach((key) => {
        if (wireToSegmentMap[key] === null) {
            wireToSegmentMap[key] = 6;
        }
    });

    let numbers = [];
    data.outputs.forEach((input) => {
        let arr = [...input];
        let segmentArr = Array(7).fill(0);
        arr.forEach((letter) => {
            segmentArr[wireToSegmentMap[letter]] = 1;
        });

        numberSegments.forEach((segment, number) => {
            if ( segmentArr.toString() === segment.toString() ) {
                numbers.push(number);
            }
        })
    });

    total += parseInt(numbers.join(""));
});

console.log(total);