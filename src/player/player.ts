export type Player = "black" | "white";
export const WHITE_PLAYER: Player = "white";
export const BLACK_PLAYER: Player = "black";

export const switchPlayer = (player: Player) => {
  if (player === BLACK_PLAYER) return WHITE_PLAYER;
  if (player === WHITE_PLAYER) return BLACK_PLAYER;
};
