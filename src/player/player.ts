export type Player = "black" | "white";
export const WHITE_PLAYER: Player = "white";
export const BLACK_PLAYER: Player = "black";

export const switchPlayer = (player: Player) => {
  return player === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER;
};
