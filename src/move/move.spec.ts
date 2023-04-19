import { checkIfMoveIsAllowed } from "./move";

describe("checkIfMoveIsAllowed", () => {
  it("should block move on unallowed first move tile", () => {
    expect(checkIfMoveIsAllowed({ x: 1, y: 3, isFirstMove: true })).toBeFalsy();
  });

  it("should allow move on highlighted tiles", () => {
    expect(
      checkIfMoveIsAllowed({ x: 1, y: 0, isFirstMove: true })
    ).toBeTruthy();
  });
});
