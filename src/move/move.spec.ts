import { checkIfMoveIsAllowed } from "./move";

describe("checkIfMoveIsAllowed", () => {
  it("should block move on unallowed first move tile", () => {
    expect(checkIfMoveIsAllowed({ x: 1, y: 3 }, true)).toBeFalsy();
  });

  it("should allow move on allowed first move tile", () => {
    expect(checkIfMoveIsAllowed({ x: 1, y: 3 }, false)).toBeTruthy();
  });
});
