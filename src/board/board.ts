import chalk from "chalk";
import {generateCliText, Tile} from "../tile/tile";

type NullableTile = Tile|undefined|"undefined"
export type Board = NullableTile[][]

const BLANK_CHAR = chalk.black(' ')

const generateLine = (lines: NullableTile[]): string => {
    const line = ''        
    return lines.reduce((accumulator, tile) => {
        if (tile == undefined || tile == "undefined") {
            return accumulator + BLANK_CHAR
        }
        
        return accumulator + generateCliText(tile)
    }, line)
}

export const paintBoard = (board: Board) => {
    board.forEach(lines => {
        console.log(generateLine(lines))
    })
}   