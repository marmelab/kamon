const fs = require('fs');
import chalk from "chalk";
import { drawBoard } from './board/board';

let data = [
    [undefined, {color: 1, symbol: 'C'}, {color: 2, symbol: 'A'}],
    [{color: 3, symbol: 'A'}, {color: 3, symbol: 'C'}, {color: 2, symbol: 'B'}],
    [{color: 2, symbol: 'C'}, {color: 1, symbol: 'A'}, undefined]
];

/*let isFileOk = true;

if(typeof process.argv !== "object" || process.argv['f'] == null){
    console.log(chalk.red('Please use "-f" parameter to set path to config file'));
    console.log(chalk.yellow('================================'));
    console.log(chalk.yellow('loading test data instead'));
}
else{
    try {
        const dataFromFile = fs.readFileSync(process.argv['f'], 'utf8');
        if(dataFromFile != null){
            try{
                data = JSON.parse(dataFromFile)
            }
            catch (error) {
                console.log(chalk.red('Cannnot parse JSON; please check format in config file'));
                isFileOk = false;
            }
            
        }
        else{
            console.log(chalk.red('No data in file'));
            isFileOk = false;
            
        }
        console.log(data);
      } catch (err) {
        console.error(err);
        isFileOk = false;
      }

    if(isFileOk === false){
        console.log(chalk.yellow('================================'));
        console.log(chalk.yellow('loading test data instead'));
    }
}*/

drawBoard(data);
