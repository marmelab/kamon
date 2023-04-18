import chalk from "chalk";
import {drawChalkText, tileDataInterface} from "../tile/tile";

type boardData = Array<Array<undefined|tileDataInterface>>

const BLANK_CHAR = chalk.black(' ')

const drawLine = (lineArray: Array<tileDataInterface>) => {
    let line = ''        
    lineArray.forEach(dataTile => {
        if (dataTile == undefined) {
            line += BLANK_CHAR
            return
        }
        line += drawChalkText(dataTile)
    })
    
    return line
}

export const drawBoard = (data: boardData) => {
    data.forEach(lineData => {
        console.log(drawLine(lineData))
    })
}   