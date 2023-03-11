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
    console.log(player1);
    console.log(player2);
})();
