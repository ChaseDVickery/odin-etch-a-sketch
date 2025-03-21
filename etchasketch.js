
// Declarations
let currBoard;
let numSquares = 16;
let boardPadding = 16;
let squares = [];

const ORIG_SQUARE_COLOR = "#ffffff";
const PEN_COLOR = "#000000";

// Get board and parts from DOM
const container = document.querySelector("#container");
const resizeButton = document.querySelector("#resize");
const resetButton = document.querySelector("#reset");

// Utils
function getMaxBoardSize() {
    let maxDim = Math.min(window.innerWidth, window.innerHeight);
    return maxDim-(2*boardPadding)-100;
}

// Control methods
function resetSquare(square) {
    square.style.backgroundColor = ORIG_SQUARE_COLOR;
}
function resetAllSquares() {
    for (const square of squares) {
        resetSquare(square);
    }
}
function showResizePopup() {
    let sizeInput = prompt("Pick new size from 1 to 100");
    let newSize = parseInt(sizeInput);
    console.log(newSize);
    if (!Number.isInteger(newSize)) {
        alert("New size must be an integer");
        return;
    }
    if (newSize < 1 || newSize > 100) {
        alert("New size must be between 1 and 100");
        return;
    }
    setNewSize(newSize);
}
function setNewSize(newSize) {
    numSquares = newSize;
    initializeNewBoard(numSquares, numSquares);
}

function getPenColor() {
    return PEN_COLOR;
}

function initializeNewSquare() {
    // squareElem.style
    const square = document.createElement("div");
    // let squareSize = Math.min(window.innerWidth, window.innerHeight) / 16;
    // square.style.width = `${squareSize}px`;
    // square.style.height = `${squareSize}px`;
    let squareSize = 100 / numSquares;
    square.style.width = `${squareSize}%`;
    square.style.height = `100%`;
    square.style.border = "solid black 1px";
    square.style.backgroundColor = ORIG_SQUARE_COLOR;

    // mouseover bubbles, mouseenter does NOT bubble
    square.addEventListener("mouseover", (e) => {
        square.style.backgroundColor = getPenColor();
    });

    squares.push(square);

    return square;
}
function initializeNewRow(width) {
    const row = document.createElement("div");
    for (let i = 0; i < width; i++) {
        row.appendChild(initializeNewSquare());
    }
    row.style.display           = "flex";
    row.style.justifyContent    = "center";
    row.style.alignItems        = "center";
    row.style.width             = "100%";
    row.style.height            = "100%";
    return row;
}
function initializeNewBoard(width, height) {
    // Remove current board
    if (currBoard) {
        container.removeChild(currBoard);
    }
    squares = [];
    // Create new board
    currBoard = document.createElement("div");    
    // Style board
    let maxSize = getMaxBoardSize();
    currBoard.style.display         = "flex";
    currBoard.style.flexDirection   = "column";
    currBoard.style.justifyContent  = "center";
    currBoard.style.alignItems      = "center";
    currBoard.style.width           = `${maxSize}px`;
    currBoard.style.height          = `${maxSize}px`;

    for (let i = 0; i < height; i++) {
        currBoard.appendChild(initializeNewRow(width));
    }

    // Event Listeners
    window.addEventListener("resize", (e) => {
        let maxDim = getMaxBoardSize();
        currBoard.style.width           = `${maxSize}px`;
        currBoard.style.height          = `${maxSize}px`;
    });
    // currBoard.addEventListener("hover");

    container.appendChild(currBoard);
    container.style.padding = `${boardPadding}px`;
}

function initializeControlButtons() {
    resetButton.addEventListener("click", () => {
        resetAllSquares();
    });
    resizeButton.addEventListener("click", () => {
        showResizePopup();
    });
}

initializeControlButtons();
initializeNewBoard(numSquares, numSquares);