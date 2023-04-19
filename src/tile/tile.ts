import chalk from "chalk";


export const colors = ['yellow', 'blue', 'red', 'green', 'cyan', 'white'] as const
export const symbols = ['A', 'B', 'C', 'D', 'E', 'F'] as const

export type Color = typeof colors[number]
export type Symbol = typeof symbols[number]

export type Tile = PlayableTile|NeutralTile

export interface PlayableTile {
    color: Color,
    symbol: Symbol
}

interface NeutralTile {
    color: 'grey',
    symbol: 'O'
}

export const getSymbolCollection = (): Tile[] => { 
    const tiles = symbols.map((symbol) => 
        colors.map((color) => ({
            symbol,
            color
        } as Tile))
    )

    const initialValue: Tile[] = []
    const flattenTiles =  tiles.reduce((accumulator, symbol) => {
        return [...accumulator, ...symbol]
    }, initialValue)

    const neutralTile: NeutralTile = {
        symbol: 'O',
        color: 'grey'
    }
    return [...flattenTiles, neutralTile]
}

export const renderTile = (tile: Tile): string => {
    const dynamicChalk = chalk[tile.color];
    return dynamicChalk(`${tile.symbol} `)
}