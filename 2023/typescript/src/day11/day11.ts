import { readAs2DArray, readAsStringArray } from "../utils/getInput";

type Point = {
  x: number;
  y: number;
};

const findGalaxies = (input: string[][]): Point[] => {
  const galaxies: Point[] = [];
  input.forEach((line, i) => {
    line.forEach((val, j) => {
      if (val === "#") galaxies.push({ x: i, y: j });
    });
  });

  return galaxies;
};

const findExpansions = (input: string[][]): [number[], number[]] => {
  let rows = Array(input.length).fill(0);
  let cols = Array(input[0].length).fill(0);
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[i][j] === ".") rows[i]++;
      if (input[j][i] === ".") cols[i]++;
    }
  }

  rows = rows
    .map((r, i) => {
      if (r === input.length) return i;
    })
    .filter((v) => v !== undefined);
  cols = cols
    .map((c, i) => {
      if (c === input[0].length) return i;
    })
    .filter((v) => v !== undefined);
  return [rows, cols];
};

const findDistance = (
  p1: Point,
  p2: Point,
  rows: number[],
  cols: number[],
  expansionSize: number,
) => {
  const [x1, y1] = [p1.x, p1.y];
  const [x2, y2] = [p2.x, p2.y];
  let [xe, ye] = [0, 0];

  rows.forEach((r) => {
    if ((x1 < r && r < x2) || (x2 < r && r < x1)) xe++;
  });
  cols.forEach((c) => {
    if ((y1 < c && c < y2) || (y2 < c && c < y1)) ye++;
  });

  return (
    Math.abs(x2 - x1) +
    xe * (expansionSize - 1) +
    Math.abs(y2 - y1) +
    ye * (expansionSize - 1)
  );
};

const findDistances = (
  gals: Point[],
  rows: number[],
  cols: number[],
  expansionSize: number,
): number => {
  let sum = 0;

  let tmp = 0;
  for (let i = 0; i < gals.length; i++) {
    for (let j = i + 1; j < gals.length; j++) {
      const gal1: Point = { x: gals[i].x, y: gals[i].x };
      const gal2: Point = { x: gals[j].x, y: gals[j].y };
      if (gal1.x !== gal2.x || gal1.y !== gal2.y) {
        sum += findDistance(gal1, gal2, rows, cols, expansionSize);
      }
    }
  }
  return sum;
};

export const partOne = (filename: string): number => {
  const input = readAs2DArray<string>(filename, String);
  const gals = findGalaxies(input);
  const [rows, cols] = findExpansions(input);
  return findDistances(gals, rows, cols, 2);
};

export const partTwo = (filename: string): number => {
  const input = readAs2DArray<string>(filename, String);
  const gals = findGalaxies(input);
  const [rows, cols] = findExpansions(input);
  return findDistances(gals, rows, cols, 1000000);
};
