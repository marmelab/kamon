import chalk from "chalk";

type Colors = 'yellow' | 'blue' | 'red' | 'green' | 'cyan' | 'white'
type Symbols = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface Tile {
    color: Colors,
    symbol: Symbols
}

export const generateCliText = (tile: Tile): string => {
    const dynamicChalk = chalk[tile.color];
    return dynamicChalk(tile.symbol)
}