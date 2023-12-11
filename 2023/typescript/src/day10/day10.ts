import { readAsStringArray } from "../utils/getInput";

const pipes: { [key: string]: number[][] } = {
  "|": [
    [-1, 0],
    [1, 0],
  ],
  "-": [
    [0, -1],
    [0, 1],
  ],
  L: [
    [-1, 0],
    [0, 1],
  ],
  J: [
    [-1, 0],
    [0, -1],
  ],
  "7": [
    [1, 0],
    [0, -1],
  ],
  F: [
    [1, 0],
    [0, 1],
  ],
};

const createMap = (input: string[]): [number[], string[][]] => {
  let start: number[] = [];
  const map = input.map((line, i) =>
    line.split("").map((val, j) => {
      if (val === "S") start = [i, j];
      return val;
    }),
  );
  // map.forEach((line) => console.log(line.join("")));
  return [start, map];
};

const expandMap = (map: string[][]): [number[], string[][]] => {
  let start: number[] = [];
  const expandedMap: string[][] = Array.from({ length: map.length * 3 }, () =>
    Array(map[0].length * 3).fill("."),
  );

  for (let i = 0; i < map.length; i++) {
    const ri = i * 3 + 1;
    for (let j = 0; j < map[i].length; j++) {
      const ci = j * 3 + 1;
      expandedMap[ri][ci] = map[i][j];
      if (map[i][j] === "S") {
        start = [ri, ci];
        if (map[i - 1][j] !== ".") expandedMap[ri - 1][ci] = "|";
        if (map[i + 1][j] !== ".") expandedMap[ri + 1][ci] = "|";
        if (map[i][j - 1] !== ".") expandedMap[ri][ci - 1] = "-";
        if (map[i][j + 1] !== ".") expandedMap[ri][ci + 1] = "-";
      } else if (map[i][j] in pipes) {
        pipes[map[i][j]].forEach((dir) => {
          if (dir[0] !== 0) expandedMap[ri + dir[0]][ci + dir[1]] = "|";
          if (dir[1] !== 0) expandedMap[ri + dir[0]][ci + dir[1]] = "-";
        });
      }
    }
  }
  expandedMap.forEach((line) => console.log(line.join("")));
  return [start, expandedMap];
};

const evenOddRule = (map: string[][], point: number[]): boolean => {
  let left = false;
  let right = false;
  let up = false;
  let down = false;

  // Check horizontally to the left
  for (let i = point[1]; i >= 0; i--) {
    if (map[point[0]][i] === "o") {
      left = !left;
    }
  }

  // Check horizontally to the right
  for (let i = point[1]; i < map[0].length; i++) {
    if (map[point[0]][i] === "o") {
      right = !right;
    }
  }

  // Check vertically upwards
  for (let i = point[0]; i >= 0; i--) {
    if (map[i][point[1]] === "o") {
      up = !up;
    }
  }

  // Check vertically downwards
  for (let i = point[0]; i < map.length; i++) {
    if (map[i][point[1]] === "o") {
      down = !down;
    }
  }

  return left && right && up && down;
};

const floodFill = (map: string[][], point: number[], fill: string) => {
  const x = point[0];
  const y = point[1];
  if (
    x < 0 ||
    x >= map.length ||
    y < 0 ||
    y >= map[0].length ||
    map[x][y] !== "."
  ) {
    return;
  }
  map[x][y] = fill;
  floodFill(map, [x + 1, y], fill);
  floodFill(map, [x - 1, y], fill);
  floodFill(map, [x, y + 1], fill);
  floodFill(map, [x, y - 1], fill);

  return;
};

const findTiles = (map: string[][]) => {
  let count = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === ".") {
        count++;
      }
    }
  }
  return count;
};

const dfs = (
  map: string[][],
  current: number[],
  end: number[],
  seen: number[][],
  path: [string, number[]][],
): [string, number[]][] | null => {
  seen.push(current);
  path.push([map[current[0]][current[1]], [current[0], current[1]]]);

  // get neighbors
  const val = map[current[0]][current[1]];
  let neighbors: number[][];
  if (val === "S") neighbors = getStartNeighbors(current, map);
  else neighbors = getNeighbors(current, val);

  //loop through neighbors
  for (let neighbor of neighbors) {
    if (!seen.find((n) => n[0] === neighbor[0] && n[1] === neighbor[1])) {
      return dfs(map, neighbor, end, seen, path);
    } else if (
      neighbor[0] === end[0] &&
      neighbor[1] === end[1] &&
      path.length > 2
    ) {
      return path;
    }
  }

  path.pop();
  return null;
};

const getNeighbors = (point: number[], val: string): number[][] => {
  const directions: number[][] = pipes[val];
  return directions.map((dir) => [point[0] + dir[0], point[1] + dir[1]]);
};

const getStartNeighbors = (point: number[], map: string[][]): number[][] => {
  const neighbors = [];
  const [x, y] = point;
  if (map[x - 1][y] !== ".") neighbors.push([x - 1, y]);
  if (map[x + 1][y] !== ".") neighbors.push([x + 1, y]);
  if (map[x][y - 1] !== ".") neighbors.push([x, y - 1]);
  if (map[x][y + 1] !== ".") neighbors.push([x, y + 1]);
  return neighbors;
};

const findInside = (map: string[][]): number => {
  let count = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === ".") {
        if (evenOddRule(map, [i, j])) {
          count++;
        }
      }
    }
  }
  return count;
};

const markPath = (map: string[][], path: [string, number[]][]) => {
  path.forEach(([_, [x, y]]) => {
    map[x][y] = "o";
  });
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  const [start, map] = createMap(input);
  const path = dfs(map, start, start, [], []);
  return path?.length! / 2;
};

export const partTwo = (filename: string): number => {
  const input = readAsStringArray(filename);
  const [start, map] = createMap(input);
  console.log();
  const path = dfs(map, start, start, [], []);
  markPath(map, path!);
  let count = findInside(map);
  map.forEach((line) => console.log(line.join("")));
  console.log(count);
  return count;
};
