import expect from "expect";
import {Tile, generateCliText} from "./tile";

describe("generateCliText", () => {
    it("Testing with Tile input", () => {
        const MOCK_TILE = {color: "blue", symbol: "A"} as Tile;
        expect(generateCliText(MOCK_TILE)).toMatch(/A/);
    });
});
