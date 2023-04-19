import expect from "expect";
import {Tile, renderTile} from "./tile";

describe("renderTile", () => {
    it("Testing with Tile input", () => {
        const tile: Tile = {color: "blue", symbol: "A"};
        expect(renderTile(tile)).toMatch(/A/);
    });
});
