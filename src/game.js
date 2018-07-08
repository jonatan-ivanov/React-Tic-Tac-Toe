import React from 'react';
import Board from './board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepNumber: 0,
            history: [{
                squares: Array(9).fill(null),
            }],
        };
    }

    getNext() {
        return (this.state.stepNumber % 2) === 0 ? 'X' : 'O';
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (!calculateWinner(squares) && !squares[i]) {
            squares[i] = this.getNext();
            this.setState({
                stepNumber: history.length,
                history: history.concat([{
                    squares: squares
                }])
            });
        }
    }

    jumpTo(step) {
        this.setState({ stepNumber: step });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, i) => {
            const desc = i ? 'Go to move #' + i : 'Go to game start';
            return <li key={i}><button onClick={() => this.jumpTo(i)}>{desc}</button></li>;
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else if (this.state.stepNumber === 9) {
            status = 'Tie!';
        }
        else {
            status = 'Next player: ' + this.getNext();
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}
