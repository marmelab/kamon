import chalk from "chalk";
import {renderTile, Tile} from "../tile/tile";

export type NullableTile = Tile|undefined
export type Board = NullableTile[][]

const BLANK_CHAR = chalk.black(' ')

export const renderLine = (lines: NullableTile[]): string => {
    const line = ''        
    return lines.reduce((accumulator, tile) => {
        if (tile == undefined) {
            return accumulator + BLANK_CHAR
        }
        
        return accumulator + renderTile(tile)
    }, line)
}

export const renderBoard = (data: Board) => {
    data.forEach(lines => {
        console.log(renderLine(lines))
    })
}   