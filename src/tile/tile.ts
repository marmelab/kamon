import chalk from "chalk";

export type Color = 'yellow' | 'blue' | 'red' | 'green' | 'cyan' | 'white' | 'grey'
export type Symbol = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'O'

export interface Tile {
    color: Color,
    symbol: Symbol
}

export interface BlackHoleTile extends Tile {
    color: 'grey',
    symbol: 'O'
}

export const blackHoleTile: BlackHoleTile = {
    color: 'grey',
    symbol: 'O'
}

export const renderTile = (tile: Tile): string => {
    const dynamicChalk = chalk[tile.color];
    return dynamicChalk(`${tile.symbol} `)
}