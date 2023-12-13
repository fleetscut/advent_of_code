import { readAsStringArray } from "../utils/getInput";

const getField = (input: string[]): [string, number[]][] => {
  return input
    .map((line) => {
      return line.split(" ");
    })
    .map((line) => {
      const damaged = line[1].split(",").map(Number);
      return [line[0], damaged];
    });
};

const cache = new Map<string, number>();
const checkDamaged = (row: string, groups: number[]): number => {
  // if no more springs, and no more groups to check then it is a valid state
  if (row === "") return groups.length <= 0 ? 1 : 0; // if no more groups, and there are still unchecked damaged springs it is an invalid state
  if (groups.length <= 0) return row.includes("#") ? 0 : 1;
  let result = 0;
  const key = [row, groups].join("");
  if (cache.has(key)) return cache.get(key)!;

  const current = row[0];
  const group = groups[0];
  // if the row starts with '.' move on
  // we also need to check if '?' = '.' so we can handle it at the same time
  if (current.match(/[.?]/)) {
    result = result + checkDamaged(row.slice(1), groups);
  }

  // if the row starts with '#' then we need to check if its in the group
  // we also need to check if '?' = '#' so we can do that here as well
  if (current.match(/[#?]/)) {
    // 1 - Is the length of the row equal to the length of the next group to check?
    // 2 - There can be no working springs in the length of the group being checked otherwise its not a valid group
    // 3 - The next position after the group must be '.' (or '?') because there must be at least one between groups OR it is the end of the row
    if (
      group <= row.length &&
      !row.slice(0, group).includes(".") &&
      (group === row.length || row[group] !== "#")
    ) {
      result = result + checkDamaged(row.slice(group + 1), groups.slice(1));
    }
  }

  cache.set(key, result);
  return result;
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  const field = getField(input);
  return field
    .map(([row, groups]) => checkDamaged(row, groups))
    .reduce((acc, val) => acc + val);
};

export const partTwo = (filename: string): number => {
  const input = readAsStringArray(filename);
  const field = getField(input);
  return field
    .map(([row, groups]) => {
      const newRow = (row + "?").repeat(5).slice(0, (row.length + 1) * 5 - 1);
      const newGroups = [...Array(5)].fill(groups).flat();
      return checkDamaged(newRow, newGroups);
    })
    .reduce((acc, val) => acc + val);
};
