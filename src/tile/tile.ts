import chalk from "chalk";

type Colors = 'yellow' | 'blue' | 'red' | 'green' | 'cyan' | 'white'
type Symbols = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
type Players = "black" | "white"

export interface Tile {
    color: Colors,
    symbol: Symbols,
    playedBy: Players,
    lastPlayed: boolean
}

export const generateCliText = (tile: Tile): string => {
    let dynamicChalk = chalk[tile.color];

    if(tile.playedBy != null){
        if(tile.playedBy === "black"){
            dynamicChalk = dynamicChalk.bgWhite.dim
        }

        if(tile.playedBy === "white"){
            dynamicChalk = dynamicChalk.bgWhite
        }
        
    }

    if(tile.lastPlayed != null){
        dynamicChalk = dynamicChalk.bold.underline
    }
    
    return dynamicChalk(tile.symbol);
}