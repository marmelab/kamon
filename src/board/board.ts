import chalk from "chalk";
import {drawChalkText, tileDataInterface} from "../tile/tile";

type boardData = Array<Array<undefined|tileDataInterface>>

const BLANK_CHAR = chalk.black(' ')

/**
 *  @description Main entrypoint of kamon.js script.
 *  It will store states of current game, display it, check victory conditions, etc.
 */

/**
 * @description This will draw a line of tiles in console from an array of tiles.
 */
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

/**
 * @description A function to draw a board from a config json.
 * @borrows drawLine
 */
export const drawBoard = (data: boardData) => {
    data.forEach(lineData => {
        console.log(drawLine(lineData))
    })
}   