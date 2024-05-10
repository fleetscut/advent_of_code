import fs from "fs";

export const readAsString = (filename) => {
  return fs.readFileSync(filename, "utf-8").trim();
};

export const readAsArray = (filename) => {
  return fs.readFileSync(filename, "utf-8").trim().split("\n");
};
