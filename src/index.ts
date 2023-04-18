import { Board, renderBoard } from './board/board';
import { createRandomConfig } from './randomizer/randomizer';

renderBoard(createRandomConfig());
