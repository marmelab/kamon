import chalk from "chalk";

export type Color = 'yellow' | 'blue' | 'red' | 'green' | 'cyan' | 'white'
export type Symbol = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface Tile {
    color: Color,
    symbol: Symbol
}

export const renderTile = (tile: Tile): string => {
    const dynamicChalk = chalk[tile.color];
    return dynamicChalk(`${tile.symbol} `)
}