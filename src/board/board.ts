import chalk from "chalk";
import {generateCliText, Tile} from "../tile/tile";

type NullableTile = Tile|undefined
export type Board = NullableTile[][]

const BLANK_CHAR = chalk.black(' ')

const generateLine = (lines: Tile[]): string => {
    const line = ''        
    return lines.reduce((accumulator, tile) => {
        if (tile == undefined) {
            return accumulator + BLANK_CHAR
        }
        
        return accumulator + generateCliText(tile)
    }, line)
}

export const paintBoard = (data: Board) => {
    data.forEach(lines => {
        console.log(generateLine(lines))
    })
}   