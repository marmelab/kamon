const fs = require('fs');
import { Command } from 'commander';
import chalk from "chalk";
import { drawBoard } from './board/board';

const program = new Command();
program
.option('-f, --filepath <string>', "A path to load a kamon game from a file")
.parse(process.argv);

const programParameters = program.opts();
console.log(programParameters);

let data = [
    [undefined, {color: 1, symbol: 'C'}, {color: 2, symbol: 'A'}],
    [{color: 3, symbol: 'A'}, {color: 3, symbol: 'C'}, {color: 2, symbol: 'B'}],
    [{color: 2, symbol: 'C'}, {color: 1, symbol: 'A'}, undefined]
];

drawBoard(data);
