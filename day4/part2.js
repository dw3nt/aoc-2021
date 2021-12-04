const { inputData } = require("./input");
const BOARD_SIZE = inputData.boards[0][0].length;

var markedBoards = {};

function markBoardPosition(board, key, number) {
    if (! (key in markedBoards)) {
        markedBoards[key] = [];
    }

    for(let row = 0; row < board.length; row++) {
        for(let col = 0; col < board[0].length; col++) {
            if(number === board[row][col]) {
                markedBoards[key].push([row, col]);
                return;
            }
        }
    }   
}

function checkBoardForWin(markedBoard, key) {
    let rowCounts = [ 0, 0, 0, 0, 0 ];
    let colCounts = [ 0, 0, 0, 0, 0 ];

    for(let i=0; i<markedBoard.length; i++) {
        let markedPos = markedBoard[i];

        rowCounts[markedPos[0]] += 1;
        colCounts[markedPos[1]] += 1;

        if (rowCounts[markedPos[0]] === BOARD_SIZE || colCounts[markedPos[1]] === BOARD_SIZE) {
            return true;
        }
    }

    return false;
}

function calculateBoardUnmarkedTotal(board, markedPositions) {
    let boardTotal = 0;
    for(let row=0; row<BOARD_SIZE; row++) {
        for(let col=0; col<BOARD_SIZE; col++) {
            boardTotal += board[row][col];
        }
    }

    for(let index=0; index<markedPositions.length; index++) {
        let pos = markedPositions[index];
        boardTotal -= board[pos[0]][pos[1]];
    }

    return boardTotal;
}

let boardsWinKeys = [];

numbersLoop:
    for (let index=0; index<inputData.numbers.length; index++) {
        let number = inputData.numbers[index];

        for (let key=0; key<inputData.boards.length; key++) {
            if (!boardsWinKeys.includes(key)) {
                let board = inputData.boards[key];
                markBoardPosition(board, key, number);
                if (index >= BOARD_SIZE - 1) {
                    if(checkBoardForWin(markedBoards[key], key)) {
                        boardsWinKeys.push(key);
                    }
                }

                if(boardsWinKeys.length == inputData.boards.length) {
                    let boardUnmarkedTotal = calculateBoardUnmarkedTotal(inputData.boards[boardsWinKeys.at(-1)], markedBoards[boardsWinKeys.at(-1)]);
                    console.log(boardUnmarkedTotal * number);
                }
            }
        }
    }