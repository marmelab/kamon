import { readFileSync } from "fs";
export const getMock = (file: string, deserialize: boolean = true) => {
  const content = readFileSync(`${__dirname}/${file}`, "utf-8");

  if (deserialize) {
    return JSON.parse(content);
  }

  return content;
};
