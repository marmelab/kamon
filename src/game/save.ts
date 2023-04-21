import * as fs from "fs";
import { Board } from "../board/board";

export const save = (board: Board) => {
  const date = new Date()
    .toUTCString()
    .replace(",", "")
    .split(" ")
    .join("-")
    .split(":")
    .join("-");
  const fileName = `kamon-saved-${date}.json`;
  fs.writeFileSync(fileName, JSON.stringify(board));
  console.log(`Saved file: ${fileName}`);
};
