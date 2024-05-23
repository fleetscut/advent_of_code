import { readAs2DArray } from "../utils/getInput";
import { Grid, Point } from "../utils/grid";

const symbolPattern = /[#%&*\-+/=@$'"]/;

const validateParts = (input: string[][]) => {
  const schematic: Grid<string> = new Grid(input);
  const [parts, _] = parseSchematic(schematic);
  return [...parts].flatMap((set) => [...set]).reduce((acc, val) => acc + val);
};

const parseSchematic = (
  schematic: Grid<string>,
  symbolFilter: RegExp = symbolPattern,
): [Set<number>[], Point[]] => {
  let parts: Set<number>[] = [];
  const symbols = [];

  for (let row = 0; row <= schematic.rowCount; row++) {
    for (let col = 0; col <= schematic.colCount; col++) {
      const point = { x: row, y: col };
      const value = schematic.getPoint(point);

      if (value.match(symbolFilter)) {
        symbols.push(point);
        const set = new Set<number>();
        schematic.getPointNeighborList(point).forEach((n) => {
          const nVal = schematic.getPoint(n);
          if (nVal.match(/[0-9]/)) {
            set.add(findPart(schematic, n));
          }
        });
        parts.push(set);
      }
    }
  }
  return [parts, symbols];
};

const findPart = (grid: Grid<string>, point: Point): number => {
  let col = point.y;
  let testPoint = { x: point.x, y: col - 1 };
  while (col > 0 && grid.getPoint(testPoint).match(/[0-9]/)) {
    col--;
    testPoint = { x: point.x, y: col - 1 };
    if (grid.getPoint(testPoint) === undefined) {
      // console.log("moron");
    }
  }

  let partNum = grid.getPoint({ x: point.x, y: col });

  testPoint = { x: point.x, y: col + 1 };
  while (col < grid.colCount && grid.getPoint(testPoint).match(/[0-9]/)) {
    partNum = partNum + grid.getPoint(testPoint);
    col++;
    testPoint = { x: point.x, y: col + 1 };
  }

  return parseInt(partNum);
};

const findGears = (input: string[][]) => {
  const schematic: Grid<string> = new Grid(input);
  const [parts, _] = parseSchematic(schematic, /\*/);
  return [...parts]
    .filter((set) => set.size === 2)
    .map((set) => [...set].reduce((acc, val) => acc * val))
    .reduce((acc, val) => acc + val);
};

export const partOne = (filename: string): number => {
  const input = readAs2DArray<string>(filename, String);
  return validateParts(input);
};

export const partTwo = (filename: string): number => {
  const input = readAs2DArray<string>(filename, String);
  return findGears(input);
};
