const fs = require('fs');
import { Board, renderBoard } from './board/board';

const gameConfig: Board = [
    [undefined, {color: 'blue', symbol: 'C'}, {color: 'yellow', symbol: 'A'}],
    [{color: 'green', symbol: 'A'}, {color: 'green', symbol: 'C'}, {color: 'red', symbol: 'B'}],
    [{color: 'red', symbol: 'C'}, {color: 'blue', symbol: 'A'}, undefined]
];

renderBoard(gameConfig);
