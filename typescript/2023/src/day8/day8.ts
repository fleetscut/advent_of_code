import { readAsStringArray } from "../utils/getInput";

type Node = {
  [node: string]: [string, string];
};

const readMap = (input: string[]): [string[], Map<string, string[]>] => {
  const map = new Map();
  const path = input[0].split("");
  input
    .slice(2)
    .map((line) => {
      return line.replaceAll(/[=(),]/g, "").split(/\s+/);
    })
    .map((node) => map.set(node[0], [node[1], node[2]]));

  return [path, map];
};

const runMap = (
  path: string[],
  map: Map<string, string[]>,
  start: string,
  end: string,
) => {
  let current = start;
  let index = 0;
  let steps = 0;
  while (!current.match(`..${end}`)) {
    const currentMap = map.get(current);
    if (path[index] === "L") current = currentMap![0];
    if (path[index] === "R") current = currentMap![1];
    steps++;
    index = (index + 1) % path.length;
  }

  return steps;
};

const runMultipleMaps = (
  path: string[],
  map: Map<string, string[]>,
  starts: string[],
  ends: string[],
) => {
  let lcm = 1;
  for (const key of map.keys()) {
    if (key.match(/..A/)) {
      const tmp = runMap(path, map, key, "Z");
      lcm = getLCM(lcm, tmp);
    }
  }
  return lcm;
};

const ghostPaths = (map: Map<string, string[]>): [string[], string[]] => {
  const starts = [];
  const ends = [];
  for (let key of map.keys()) {
    if (key.match(/^..A/)) starts.push(key);
    if (key.match(/^..Z/)) ends.push(key);
  }
  return [starts, ends];
};

const getLCM = (a: number, b: number): number => {
  return (a * b) / getGCD(a, b);
};

const getGCD = (a: number, b: number): number => {
  return b === 0 ? a : getGCD(b, a % b);
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  const [path, map] = readMap(input);
  return runMap(path, map, "AAA", "Z");
};

export const partTwo = (filename: string): number => {
  const input = readAsStringArray(filename);
  const [path, map] = readMap(input);
  const [starts, ends] = ghostPaths(map);
  return runMultipleMaps(path, map, starts, ends);
};
