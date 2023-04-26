import * as fs from "fs";
import { Board } from "@kamon/core";

export const save = (board: Board) => {
  const date = new Date().toISOString();
  const fileName = `kamon-saved-${date}.json`;
  fs.writeFileSync(fileName, JSON.stringify(board));
  console.log(`Saved file: ${fileName}`);
};
