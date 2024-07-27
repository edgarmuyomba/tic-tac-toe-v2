const gameBoard = () => {

    let array = [null, null, null, null, null, null, null, null, null];

    function addMark(mark, index) {
        array[index] = mark;
    }

    return {
        array,
        addMark
    }
};

var player = (mark) => {
    return {
        mark
    }
}

const game = function () {
    let board = gameBoard();

    var acceptableMoves = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

    function playRound(player, index) {
        board.addMark(player.mark, index);
        var pos = acceptableMoves.indexOf(index);
        acceptableMoves[pos] = null;
    }

    function availableSpots(arr) {
        let spots = [];
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                spots.push(i);
            }
        }
        return spots;
    }

    function checkDraw() {
        var draw = true;
        acceptableMoves.forEach((move) => {
            if (move) {
                draw = false;
            }
        });
        return draw;
    }

    function checkWinner() {
        let winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        var win = null;
        winCombos.forEach((combo) => {
            var one = combo[0];
            var two = combo[1];
            var three = combo[2];
            if (board.array[one] && board.array[two] && board.array[three]) {
                if ((board.array[one] === board.array[two]) && (board.array[one] === board.array[three])) win = board.array[one];
            }
        });
        return win;
    }

    return {
        playRound,
        availableSpots,
        board,
        checkWinner,
        checkDraw,
        acceptableMoves,
    }
};

const gameController = (function () {

    let newGame = game();

    let winner = false;

    // players
    let human = player("X");
    let cpu = player("O");

    var activePlayer = human;

    function switchPlayer() {
        activePlayer = activePlayer === human ? cpu : human;
        if (activePlayer === cpu) setTimeout(() => computer(), 500);
    }

    var playerButtons = document.querySelectorAll('.footer *');
    playerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            choosePlayer(button);
        });
    });

    function choosePlayer(cont) {
        // check if game had started
        newGame.acceptableMoves.forEach((move) => {
            if (!move) clearBoard();
        });

        if (cont.textContent === "o") {
            playerButtons[1].classList.add('selected');
            playerButtons[0].classList.remove('selected');
            cpu = player("X");
            human = player("O");
            activePlayer = cpu;
            setTimeout(() => computer(), 500);
        }
        else {
            playerButtons[0].classList.add('selected');
            playerButtons[1].classList.remove('selected');
            cpu = player("O");
            human = player("X");
            activePlayer = human;
        }
    }

    var state = document.querySelector('.state');

    function declareState() {
        // end the game
        if (winner) {
            state.textContent = `${activePlayer.mark} is the winner`;
            newGame.acceptableMoves = [];
        } else {
            state.textContent = "The game is draw";
        }
        state.removeAttribute('style');
    }

    // play 
    function play(cell) {
        let id = cell.id;
        if (newGame.acceptableMoves[id]) {
            newGame.playRound(activePlayer, id);
            cell.textContent = activePlayer.mark;
            // check for a draw
            if (newGame.checkDraw()) declareState();
            //check for a win
            winner = newGame.checkWinner();
            if (winner) declareState();
            switchPlayer();
        }
    }

    // game cells
    let cells = document.querySelectorAll('.cell');

    // play until a winner is declared or game ends in a draw!
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            play(cell);
        });
    });

    // restart game 
    let restart = document.querySelector('.restart div');

    restart.onclick = () => clearBoard();

    function clearBoard() {
        // essentially create a new game
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        state.setAttribute('style', 'display: none;');
        newGame = game();
        activePlayer = human;
    }

    function computer() {
        let index = aiMove();
        cells.forEach((cell) => {
            if (cell.id === String(index)) play(cell);
        })
    }

    function aiMove() {
        if (newGame.checkDraw() || newGame.checkWinner()) return null;
        else {
            let bestMove = null;
            let bestScore = -Infinity;

            let array = newGame.board.array;

            for (let i of newGame.availableSpots(array)) {
                array[i] = cpu.mark;
                let score = minimax(array, 0, false);
                array[i] = null
                if (score > bestScore) {
                    bestMove = i;
                    bestScore = score;
                }
            }
            return bestMove;
        }


    };

    function minimax(arr, depth, isMax) {
        let winner = newGame.checkWinner(arr);
        if (winner) {
            if (winner === cpu.mark) return 1;
            else return -1;
        }

        let freeSpots = newGame.availableSpots(arr);

        if (freeSpots.length === 0) return 0;

        if (isMax) {
            let maxValue = -Infinity;
            for (let i of freeSpots) {
                arr[i] = cpu.mark;
                let value = minimax(arr, depth + 1, false);
                arr[i] = null;
                maxValue = Math.max(maxValue, value);
            }
            return maxValue;
        } else {
            let minValue = Infinity;
            for (let i of freeSpots) {
                arr[i] = human.mark;
                let value = minimax(arr, depth + 1, true);
                arr[i] = null;
                minValue = Math.min(minValue, value);
            }
            return minValue;
        }
    }

})();