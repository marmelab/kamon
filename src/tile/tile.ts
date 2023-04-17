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
 * @description Draw text from a tile object.
 */
export const drawChalkText = (tileData: tileDataInterface): string => {
    const drawTextFunction = chalk[Colors[tileData.color]];
    return drawTextFunction(tileData.symbol)
}