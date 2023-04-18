const fs = require('fs');
import { Board, paintBoard } from './board/board';
import { initCLI, loadGameConfigFromFile } from './cli/cli';

initCLI();
const loadedGameConfig : Board = loadGameConfigFromFile();
paintBoard(loadedGameConfig);

