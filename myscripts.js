// gameBoard module to make the gameboard
const gameBoard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    return {board}
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

    const clickedBlock = () => {
        console.log(curr.symbol) 
        curr = curr == player1 ? player2 : player1;
    }
    console.log(player1);
    console.log(player2);
    return {clickedBlock}
})();

//
const allBlocks = document.querySelectorAll(".block")
allBlocks.forEach((block) => block.addEventListener('click', displayController.clickedBlock))