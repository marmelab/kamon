import chalk from "chalk";
import Tile, {tileDataInterface} from "../tile/tile";

type boardData = Array<Array<undefined|tileDataInterface>>

const BLANK_CHAR = chalk.black(' ')

/**
 *  @description Main entrypoint of kamon.js script.
 *  It will store states of current game, display it, check victory conditions, etc.
 */
export default class Board {
    data: boardData

    constructor(data: boardData) {
        this.data = data
    }

    /**
     * @description This will draw a line of tiles in console from an array of tiles.
     */
    drawLine = (lineArray: Array<tileDataInterface>) => {
        let line = ''        
        lineArray.forEach(dataTile => {
            if (dataTile == undefined) {
                line += BLANK_CHAR
                return
            }
            const tile = new Tile(dataTile)
            line += tile.drawChalkText()
        })
        
        return line
    }

    /**
     * @description A function to draw a board from a config json.
     * @borrows drawLine
     */
    draw = () => {
        this.data.forEach(lineData => {
            console.log(this.drawLine(lineData))
        })
    }   
}