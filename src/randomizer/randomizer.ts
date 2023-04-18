import { Board } from "../board/board"
import { Color, Symbol, Tile, blackHoleTile } from "../tile/tile"

const symbols: Symbol[]= ['A', 'B', 'C', 'D', 'E', 'F', 'O']
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

const createRandomTiles = (number: number = 4, insertBlackHole: boolean = false): Tile[] => {
    const tiles = []
    const insertBlackHoleAt = Math.floor(Math.random() * number)
    for (let index = 0; index < number; index++) {
        if (insertBlackHole && insertBlackHoleAt === index) {
            tiles.push(blackHoleTile)
        } else {
            tiles.push(createRandomTile())
        }
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
    const randomConfig = []
    const insertBlackHoleAt = Math.floor(Math.random() * lineNumber)
    let undefinedNumber = 3
    let pillsNumber = 4

    for (let index = 0; index < lineNumber; index++) {
        const tiles = createRandomTiles(pillsNumber, index === insertBlackHoleAt ? true : false)
        randomConfig.push([...createUndefinedTiles(undefinedNumber), ...tiles, ...createUndefinedTiles(undefinedNumber)])

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
