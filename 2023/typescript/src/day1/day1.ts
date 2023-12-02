import { readAsStringArray } from "../utils/getInput";

// cover cases like oneight eighthree etc...
const numberMap = new Map<string, string>([
  ["one", "o1e"],
  ["two", "t2o"],
  ["three", "t3e"],
  ["four", "f4r"],
  ["five", "f5e"],
  ["six", "s6x"],
  ["seven", "s7n"],
  ["eight", "e8t"],
  ["nine", "n9e"],
]);

const getCalibrationValue = (
  input: string[],
  useDigit: boolean = false,
): number => {
  if (useDigit) {
    for (let i = 0; i < input.length; i++) {
      numberMap.forEach(
        (val, key) => (input[i] = input[i].replaceAll(key, val)),
      );
    }
  }

  console.log(input);
  return input
    .map((line) => line.split("").filter((c) => parseInt(c)))
    .map((val) => parseInt(val[0] + val.at(-1)))
    .reduce((acc, val) => acc + val);
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  return getCalibrationValue(input);
};

export const partTwo = (filename: string) => {
  const input = readAsStringArray(filename);
  return getCalibrationValue(input, true);
};
