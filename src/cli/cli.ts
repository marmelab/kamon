import { Command } from 'commander';

let program : Command;

export const initCLI = () => {
    program = new Command();
    program
    .option('-f, --filepath <string>', "A path to load a kamon game from a file")
    .parse(process.argv);
}

export const getFilePath = ():string => {
    return program.opts()['filepath'];
}



