import { readAs2DArray } from "../utils/getInput";
import { Grid, Dirs, Point } from "../utils/grid";

const symbolPattern = /[#%&*\-+/=@$'"]/;
const validateParts = (input: string[][]) => {
  const schematic: Grid<string> = new Grid(input);
  const [partsNumberList, symbolsList] = parseSchematic(schematic);
  return partsNumberList
    .filter((list) =>
      list
        .map((part) =>
          schematic
            .getPointNeighborList(part)
            .map((n) => schematic.getPoint(n).match(symbolPattern))
            .reduce((acc, val) => acc || val),
        )
        .reduce((acc, val) => acc || val),
    )
    .map((list) =>
      list
        .map((part) => schematic.getPoint(part))
        .reduce((acc, val) => acc + val),
    )
    .map((v) => parseInt(v));
};

const parseSchematic = (
  schematic: Grid<string>,
  symbolFilter: RegExp = symbolPattern,
): [Point[][], Point[]] => {
  const parts = [];
  const symbols = [];

  for (let row = 0; row <= schematic.rowCount; row++) {
    let sequence: Point[] = [];
    for (let col = 0; col <= schematic.colCount; col++) {
      const point = { x: row, y: col };
      const value = schematic.getPoint(point);
      if (value.match(/[0-9]/)) {
        sequence.push(point);
        if (col === schematic.colCount) {
          parts.push(sequence);
        }
      } else {
        if (
          col > 0 &&
          schematic.getPoint({ x: point.x, y: point.y - 1 }).match(/[0-9]/)
        ) {
          parts.push(sequence);
        }
        sequence = [];
        if (value.match(symbolFilter)) {
          symbols.push(point);
        }
      }
    }
  }
  return [parts, symbols];
};

const findGears = (input: string[][]): number[] => {
  const schematic: Grid<string> = new Grid(input);
  const [partsNumberList, symbolsList] = parseSchematic(schematic, /\*/);
  return symbolsList
    .map((sym) => {
      const tmp = schematic
        .getPointNeighborList(sym)
        .filter((n) => schematic.getPoint(n).match(/[0-9]/))
        .map((n) => {
          let left = findGroup(schematic, { x: n.x, y: n.y - 1 }, Dirs.W);
          let right = findGroup(schematic, n, Dirs.E)
            .split("")
            .reverse()
            .join("");
          return parseInt(left + right);
        })
        .filter((n) => n);
      return tmp;
    })
    .map((n) => [...new Set(n)])
    .filter((n) => n.length === 2)
    .map((n) => n[0] * n[1]);
};

const findGroup = (
  grid: Grid<string>,
  point: Point,
  dir: Point,
  value: string = "",
): string => {
  if (grid.getPoint(point) === ".") {
    return value;
  }
  const next = grid.getPointNeighbor(point, dir);
  if (next !== null) {
    const val = grid.getPoint(next);
    if (val.match(/[0-9]/)) value = findGroup(grid, next, dir, value);
  }
  return value + grid.getPoint(point);
};

export const partOne = (filename: string): number => {
  const input = readAs2DArray<string>(filename, String);
  return validateParts(input).reduce((acc, val) => acc + val);
};

export const partTwo = (filename: string): number => {
  const input = readAs2DArray<string>(filename, String);
  return findGears(input).reduce((acc, val) => acc + val);
};
