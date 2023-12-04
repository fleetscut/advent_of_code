import fs from "fs";

export const readAsString = (filename: string): string => {
  return fs.readFileSync(filename, "utf-8").trim();
};

export const readAsStringArray = (filename: string): string[] => {
  return fs.readFileSync(filename, "utf-8").trim().split("\n");
};

// types of arrays to parse to
type ArrayType = string | number;

// Function used to cast from ArrayType to T
interface ParseFunc<T extends ArrayType> {
  (value: any): T;
}

export const readAs2DArray = <T extends ArrayType>(
  filename: string,
  cast: ParseFunc<T>,
): T[][] => {
  return fs
    .readFileSync(filename, "utf-8")
    .trim()
    .split("\n")
    .map((line) =>
      line.split("").map((char) => {
        return cast(char);
      }),
    );
};
