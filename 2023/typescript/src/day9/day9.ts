import { readAsStringArray } from "../utils/getInput";

const getDifference = (input: number[]): number => {
  if (new Set(input).size === 1) return input[input.length - 1];
  const diffs = input.slice(1).map((val, i) => {
    return input[i] === undefined ? val : val - input[i];
  });
  return input[input.length - 1] + getDifference(diffs);
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  return input
    .map((sequence) =>
      getDifference(sequence.split(" ").map((val) => parseInt(val))),
    )
    .reduce((acc, val) => acc + val);
};

export const partTwo = (filename: string): number => {
  const input = readAsStringArray(filename);
  return input
    .map((sequence) =>
      getDifference(
        sequence
          .split(" ")
          .map((val) => parseInt(val))
          .reverse(),
      ),
    )
    .reduce((acc, val) => acc + val);
};
