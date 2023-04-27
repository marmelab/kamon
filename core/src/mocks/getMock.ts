import { readFileSync } from "fs";
export const getMockFromJson = (file: string) => {
  const content = readFileSync(`${__dirname}/../../${file}`, "utf-8");
  return JSON.parse(content);
};
