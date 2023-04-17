import Board from './board/board';

const data = [
    [undefined, {color: 1, symbol: 'C'}, {color: 2, symbol: 'A'}],
    [{color: 3, symbol: 'A'}, {color: 3, symbol: 'C'}, {color: 2, symbol: 'B'}],
    [{color: 2, symbol: 'C'}, {color: 1, symbol: 'A'}, undefined]
]

const board = new Board(data)
board.draw()
