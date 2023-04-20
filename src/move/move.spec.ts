import { checkIfMoveIsAllowed } from "./move";

describe("checkIfMoveIsAllowed", () => {
  it("should block move on unallowed first move tile", () => {
    expect(checkIfMoveIsAllowed({ x: 3, y: 0 }, true)).toBeFalsy();
  });

  it("should allow move on allowed first move tile", () => {
    expect(checkIfMoveIsAllowed({ x: 4, y: 0 }, true)).toBeTruthy();
  });

  it("should allow any move after first turn", () => {
    expect(checkIfMoveIsAllowed({ x: 3, y: 0 }, false)).toBeTruthy();
  });
});
