import { Tile } from "../tile/tile";
import {renderLine, Board, renderBoard, NullableTile} from "./board"

describe("renderLine", () => {
    it("Testing a line with both undefined and Tile values", () => {
        const tile: Tile = {color: "blue", symbol: "A"} ;
        const line: NullableTile[] = [undefined, tile, undefined];
        expect(renderLine(line)).toMatch(/\s.*A.*\s/);
    });
});

describe("renderBoard", () => {
    it("executing renderBoard with mock data", () => {
        const board: Board = [[undefined, {"color": "red", "symbol": "A"}, {"color": "blue", "symbol": "A"}],
        [{"color": "red", "symbol": "A"}, {"color": "blue", "symbol": "C"}, {"color": "red", "symbol": "B"}],
        [{"color": "blue", "symbol": "C"}, {"color": "yellow", "symbol": "A"}, undefined]];
        expect(renderBoard(board));
    });
});