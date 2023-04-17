import chalk from 'chalk'

const log = console.log

const data = [
    [undefined, {color: 1, symbol: 'C'}, {color: 2, symbol: 'A'}],
    [{color: 3, symbol: 'A'}, {color: 3, symbol: 'C'}, {color: 2, symbol: 'B'}],
    [{color: 2, symbol: 'C'}, {color: 1, symbol: 'A'}, undefined]
]

/**
 * @description This will draw a line of tiles in console from an array of tiles.
 */
const drawLine = (tilesArray) => {
    
};

/**
 * @description A function to draw a board from a config json.
 * @borrows drawTile
 */
const drawBoard = (configJson) => {

}

const colors = [
    'yellow',
    'blue',
    'red',
    'green',
    'cyan',
    'white'
]

data.forEach(tiles => {
    let line = ''
    tiles.forEach(tile => {
        if (typeof tile === 'undefined') {
            line += chalk.black(' ')
            return
        }
        line += chalk[colors[tile.color]](tile.symbol)
    })

    log(line)
})
