import chalk from "chalk";
import {renderTile, Tile} from "../tile/tile";

type NullableTile = Tile|undefined
export type Board = NullableTile[][]

const BLANK_CHAR = chalk.black(' ')

const renderLine = (lines: Tile[]): string => {
    const line = ''        
    return lines.reduce((accumulator, tile) => {
        if (tile == undefined) {
            return accumulator + BLANK_CHAR
        }
        
        return accumulator + renderTile(tile)
    }, line)
}

export const paintBoard = (data: Board) => {
    data.forEach(lines => {
        console.log(renderLine(lines))
    })
}   