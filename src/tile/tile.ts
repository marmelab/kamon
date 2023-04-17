import chalk from "chalk";

enum Colors {
    'yellow',
    'blue',
    'red',
    'green',
    'cyan',
    'white'
}

enum Symbols {
    A = 'A',
    B = 'B', 
    C = 'C', 
    D = 'D', 
    E = 'E',
    F = 'F'
}

export interface tileDataInterface {
    color: number,
    symbol: string
}

/**
 * @description A tile object from a kanon board.
 * Should handle its own state logic.
 */
export default class Tile {

    color: number;
    symbol: string;

    constructor(tileData: tileDataInterface){
        this.color = tileData.color;
        this.symbol = tileData.symbol
    }

    drawChalkText = () => {
        const drawTextFunction = chalk[Colors[this.color]];
        return drawTextFunction(this.symbol)
    }
};