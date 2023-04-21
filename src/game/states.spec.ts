import { checkIfDraw } from "./state";

describe("checkIfDraw", () => {
  it("should be true for turn number after 35", () => {
    expect(checkIfDraw(36)).toBeTruthy();
  });

  it("should be false for turn number 35 and below", () => {
    expect(checkIfDraw(35)).toBeFalsy();
  });
});
