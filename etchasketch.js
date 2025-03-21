
// Declarations
let currBoard;

// Get board and parts from DOM
const container = document.querySelector("#container");


function initializeNewSquare() {
    // squareElem.style
    const square = document.createElement("div");
    // let squareSize = Math.min(window.innerWidth, window.innerHeight) / 16;
    // square.style.width = `${squareSize}px`;
    // square.style.height = `${squareSize}px`;
    let squareSize = 100 / 16;
    square.style.width = `${squareSize}%`;
    square.style.height = `100%`;
    square.style.border = "solid black 1px";
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
    // Create new board
    currBoard = document.createElement("div");    
    // Style board
    let maxDim = Math.min(window.innerWidth, window.innerHeight);
    // currBoard.style.cssText         = "background-color: blue";
    currBoard.style.display         = "flex";
    currBoard.style.flexDirection   = "column";
    currBoard.style.justifyContent  = "center";
    currBoard.style.alignItems      = "center";
    currBoard.style.width           = `${maxDim}px`;
    currBoard.style.height          = `${maxDim}px`;

    for (let i = 0; i < height; i++) {
        currBoard.appendChild(initializeNewRow(width));
    }

    window.addEventListener("resize", (e) => {
        let maxDim = Math.min(window.innerWidth, window.innerHeight);
        currBoard.style.width           = `${maxDim}px`;
        currBoard.style.height          = `${maxDim}px`;
    })

    container.appendChild(currBoard);
}


initializeNewBoard(16, 16);