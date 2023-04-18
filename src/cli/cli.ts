const fs = require('fs');
const path = require('path');
import { Command } from 'commander';
import {Board} from "../board/board"
import chalk from "chalk";

let program : Command;
const CANNOT_READ_FILE_ERROR = "Can't read file; please check your -f argument point to a valid file."

export const initCLI = () => {
    program = new Command();
    program
    .option('-f, --filepath <string>', "A path to load a kamon game from a file")
    .parse(process.argv);
}

export const loadGameConfigFromFile = ():Board => {
    const filePath = loadFileFromParameters();
    return loadFileFromPath(filePath);
}

const loadFileFromParameters = ():string => {
    return program.opts()['filepath'];
}

const loadFileFromPath = (filePath:string):Board => {
    let dataPulledFromFile;
    let result;

    try{
        dataPulledFromFile = fs.readFileSync(filePath, 'utf8')
    }
    catch(error){
        console.log(chalk.red(CANNOT_READ_FILE_ERROR))
    }

    if(dataPulledFromFile != null){
        try{
            result = JSON.parse(dataPulledFromFile);
        }
        catch(error){
            console.log(chalk.red(CANNOT_READ_FILE_ERROR))
        }
    }
    return result;
}

