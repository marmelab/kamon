import chalk from "chalk";
import {drawChalkText, tileDataInterface} from "../tile/tile";

type boardData = Array<Array<undefined|tileDataInterface>>

const BLANK_CHAR = chalk.black(' ')

const drawLine = (lineArray: Array<tileDataInterface>): string => {
    const line = ''        
    return lineArray.reduce((accumulator, tile) => {
        if (tile == undefined) {
            return accumulator + BLANK_CHAR
        }
        
        return accumulator + drawChalkText(tile)
    }, line)
}

export const drawBoard = (data: boardData) => {
    data.forEach(lineData => {
        console.log(drawLine(lineData))
    })
}   