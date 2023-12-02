import fs from "fs";

export const readAsString = (filename: string): string => {
  return fs.readFileSync(filename, "utf-8").trim();
};

export const readAsStringArray = (filename: string): string[] => {
  return fs.readFileSync(filename, "utf-8").trim().split("\n");
};
