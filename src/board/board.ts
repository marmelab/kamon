import chalk from "chalk";
import {drawChalkText, tileDataInterface} from "../tile/tile";

type boardData = Array<Array<undefined|tileDataInterface>>

const BLANK_CHAR = chalk.black(' ')

const drawLine = (lines: Array<tileDataInterface>): string => {
    const line = ''        
    return lines.reduce((accumulator, tile) => {
        if (tile == undefined) {
            return accumulator + BLANK_CHAR
        }
        
        return accumulator + drawChalkText(tile)
    }, line)
}

export const drawBoard = (data: boardData) => {
    data.forEach(lines => {
        console.log(drawLine(lines))
    })
}   