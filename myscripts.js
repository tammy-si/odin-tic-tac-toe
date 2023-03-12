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
                return true
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i]==symbol && board[1][i]==symbol && board[2][i] == symbol) {
                return true
            }
        }
        // check diagonals
        if (board[0][0]==symbol && board[1][1]==symbol && board[2][2] == symbol) {
            return true
        } else if (board[0][2]==symbol && board[1][1]==symbol && board[2][0] == symbol) {
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

    const clickedBlock = (block, board) => {
        // clicked Location is an array with the block location the user clicked
        let clickedLocation = block.id.split(" ")
        console.log(clickedLocation)
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
                console.log(curr.symbol + "won")
            }
            // this to alternate turn
            curr = curr == player1 ? player2 : player1;
        }
        console.log(curr)
    }
    console.log(player1);
    console.log(player2);
    return {clickedBlock}
})();

// makes eventlisteners for block
const allBlocks = document.querySelectorAll(".block")
allBlocks.forEach((block) => block.addEventListener('click', () => {
    displayController.clickedBlock(block, gameBoard);
}))
