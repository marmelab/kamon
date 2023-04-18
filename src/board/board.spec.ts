import { Tile } from "../tile/tile";
import {renderLine, Board, renderBoard, NullableTile} from "./board"

describe("renderLine", () => {
    it("Testing a line with both undefined and Tile values", () => {
        const MOCK_TILE = {color: "blue", symbol: "A"} as Tile;
        const MOCK_LINE = ["undefined", MOCK_TILE, undefined] as NullableTile[];
        expect(renderLine(MOCK_LINE)).toMatch(/\s.*A.*\s/);
    });
});

describe("renderBoard", () => {
    it("executing renderBoard with mock data", () => {
        const MOCK_BOARD = [[undefined, {"color": "red", "symbol": "X"}, {"color": "blue", "symbol": "A"}],
        [{"color": "red", "symbol": "A"}, {"color": "blue", "symbol": "C"}, {"color": "red", "symbol": "B"}],
        [{"color": "blue", "symbol": "C"}, {"color": "yellow", "symbol": "A"}, undefined]] as Board;
        expect(renderBoard(MOCK_BOARD));
    });
});