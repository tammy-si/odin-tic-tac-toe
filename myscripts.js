const allBlocks = document.querySelectorAll(".block")
const winnerDiv = document.querySelector(".winner");
const restartButton = document.querySelector(".restart")
const nextP = document.querySelector('.next')

// gameBoard module to make the gameboard
const gameBoard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const checkLocation = (x, y) => {
        // if the location the user clicked on is empty, returns true
        return board[x][y] == "";
    }

    const placeSymbol = (x, y, symbol) => {
        board[x][y] = symbol;
    }

    // check if anyone has won reutrns True if someone has won
    const checkWin = (symbol) => {
        // check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0]==symbol && board[i][1]==symbol && board[i][2] == symbol) {
                // draw out the winning line
                let line = document.querySelector('.rowWin');
                line.style.display = "block";
                // move the line to where it won
                line.style.top = String(i * 100 + 40) + "px";
                return true;
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i]==symbol && board[1][i]==symbol && board[2][i] == symbol) {
                let line = document.querySelector('.columnWin');
                line.style.display = "block";
                // move the line to where it won
                line.style.left = String(i * 100 - 100) + "px";
                return true
            }
        }
        // check diagonals
        if (board[0][0]==symbol && board[1][1]==symbol && board[2][2] == symbol) {
            let line = document.querySelector('.diagonalWin');
            line.style.display = "block";
            // move the line to where it won
            line.style.transform = 'rotate(45deg)' ;
            return true
        } else if (board[0][2]==symbol && board[1][1]==symbol && board[2][0] == symbol) {
            let line = document.querySelector('.diagonalWin');
            line.style.display = "block";
            // move the line to where it won
            line.style.transform = 'rotate(135deg)' ;
            return true
        }
        return false
    }

    return {board, checkLocation, placeSymbol, checkWin}
})();

const Player = (sym) => {
    const symbol = sym;
    return {symbol}
}

// to play the actual game
const displayController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let curr = player1;

    // board is the board module board.board is the array
    // clears the game and restarts sort of
    const clear = (board) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board.board[i][j] = "";
            }
        }
        // clears all symbols visually
        allBlocks.forEach(block => block.innerHTML = "")
        // hides the winning line, makes all the lines none
        document.querySelectorAll("hr").forEach(line => line.style.display = "none");
        // now close the winner display
        winnerDiv.style.display = "none";
    }

    const clickedBlock = (block, board) => {
        // clicked Location is an array with the block location the user clicked
        let clickedLocation = block.id.split(" ")
        let x = Number(clickedLocation[0]);
        let y = Number(clickedLocation[1]);
        // make sure that the block the user clicked on is actually empty before we can put it in
        if (board.checkLocation(x, y)) {
            // if it's empty we can up the location in the board with the current player's symbol
            board.placeSymbol(x, y, curr.symbol);
            // also change the DOM to match
            block.textContent = curr.symbol;
            // check if this move caused the player to win
            if (board.checkWin(curr.symbol)) {
                // declare a winner and only clear once
                // display the winner then restart the game by just clearing everything
                winnerDiv.innerHTML = curr.symbol + " won";
                winnerDiv.style.display = "flex";
            }
            // this to alternate turn
            curr = curr == player1 ? player2 : player1;
            nextP.textContent = curr.symbol + " is next."
        }
    }
    return {clickedBlock, clear}
})();

// makes eventlisteners for block
allBlocks.forEach((block) => block.addEventListener('click', () => {
    displayController.clickedBlock(block, gameBoard);
}))

winnerDiv.addEventListener("click", () => {
    displayController.clear(gameBoard);
})

restartButton.addEventListener("click", () => {
    displayController.clear(gameBoard);
})