import expect from "expect";
import {Tile, renderTile} from "./tile";

describe("renderTile", () => {
    it("Testing with Tile input", () => {
        const MOCK_TILE = {color: "blue", symbol: "A"} as Tile;
        expect(renderTile(MOCK_TILE)).toMatch(/A/);
    });
});
