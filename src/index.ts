import { Board, renderBoard } from './board/board';
import { initCLI } from './cli/cli';
import { loadGameConfigFromFile } from './gameLoader/gameLoader';

initCLI();
const gameConfig : Board = loadGameConfigFromFile();

renderBoard(gameConfig);
