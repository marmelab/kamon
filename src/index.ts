const fs = require('fs');
import { Board, paintBoard } from './board/board';

const gameConfig: Board = [
    [undefined, {color: 'blue', symbol: 'C'}, {color: 'yellow', symbol: 'A'}],
    [{color: 'green', symbol: 'A'}, {color: 'green', symbol: 'C'}, {color: 'red', symbol: 'B'}],
    [{color: 'red', symbol: 'C'}, {color: 'blue', symbol: 'A'}, undefined]
];

paintBoard(gameConfig);
