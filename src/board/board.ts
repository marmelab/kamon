import chalk from "chalk";
import {generateCliText, tileDataInterface} from "../tile/tile";

type boardData = Array<Array<undefined|tileDataInterface>>

const BLANK_CHAR = chalk.black(' ')

const generateLine = (lines: Array<tileDataInterface>): string => {
    const line = ''        
    return lines.reduce((accumulator, tile) => {
        if (tile == undefined) {
            return accumulator + BLANK_CHAR
        }
        
        return accumulator + generateCliText(tile)
    }, line)
}

export const paintBoard = (data: boardData) => {
    data.forEach(lines => {
        console.log(generateLine(lines))
    })
}   