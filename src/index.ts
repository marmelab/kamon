const fs = require('fs');
import { Board, paintBoard } from './board/board';
import { initCLI } from './cli/cli';
import { loadGameConfigFromFile } from './gameLoader/gameLoader';

initCLI();
const loadedGameConfig : Board = loadGameConfigFromFile();
paintBoard(loadedGameConfig);

