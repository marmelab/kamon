import { Board } from "../board/board"
import { Color, Symbol, Tile } from "../tile/tile"

const symbols: Symbol[]= ['A', 'B', 'C', 'D', 'E', 'F']
const colors: Color[] = ['yellow', 'blue', 'red', 'green', 'cyan', 'white']
const getRandom = <T>(array:T[]): T => array[Math.floor(Math.random()*array.length)]

const getRandomSymbol = (): Symbol => getRandom(symbols)
const getRandomColor = (): Color => getRandom(colors)

const createRandomTile = (): Tile  => {
    return {
        color: getRandomColor(), 
        symbol: getRandomSymbol()
    }
}

const createRandomTiles = (number: number): Tile[] => {
    const tiles = []
    for (let index = 0; index < number; index++) {
        tiles.push(createRandomTile())
    }
    return tiles
}

const createUndefinedTiles = (number: number): undefined[] => {
    const tiles = []
    for (let index = 0; index < number; index++) {
        tiles.push(undefined)
    }
    return tiles
}

export const createRandomConfig = (): Board => {

    const lineNumber = 7
    let undefinedNumber = 3
    let pillsNumber = 4
    const randomConfig = []

    for (let index = 0; index < lineNumber; index++) {
        randomConfig.push([...createUndefinedTiles(undefinedNumber), ...createRandomTiles(pillsNumber), ...createUndefinedTiles(undefinedNumber)])

        if (index < 3) {
            pillsNumber++
            undefinedNumber--
        } else {
            pillsNumber--
            undefinedNumber++
        }
    }
    return randomConfig
}
