import { readAsStringArray } from "../utils/getInput";

const getRecords = (input: string[], kerning: boolean) => {
  const records = input
    .map((line) => line.split(":")[1].trim())
    .map((line) => {
      if (kerning) return [parseInt(line.replaceAll(/\s/g, ""))];
      else return line.split(/\s+/).map((num) => parseInt(num));
    });
  const recordPairs = [];
  for (let i = 0; i < records[0].length; i++) {
    recordPairs.push([records[0][i], records[1][i]]);
  }
  return recordPairs;
};

const findTimeRoots = (time: number, dist: number): number[] => {
  const right = (time + Math.sqrt(time * time - 4 * dist)) / 2;
  const left = (time - Math.sqrt(time * time - 4 * dist)) / 2;

  // Roots for this problem are non inclusive so +/- 1 to exclude the roots
  // themselves
  return [Math.floor(left + 1), Math.ceil(right - 1)];
};
export const partOne = (filename: string) => {
  const input = readAsStringArray(filename);
  const records = getRecords(input, false);
  const roots = records.map(([time, dist]) => findTimeRoots(time, dist));
  return roots.map(([a, b]) => b - a + 1).reduce((acc, val) => acc * val);
};

export const partTwo = (filename: string) => {
  const input = readAsStringArray(filename);
  const records = getRecords(input, true);
  const roots = records.map(([time, dist]) => findTimeRoots(time, dist));
  return roots.map(([a, b]) => b - a + 1).reduce((acc, val) => acc * val);
};
