export type Point = { x: number; y: number };

export const Dirs: { [key: string]: Point } = {
  N: { x: -1, y: 0 },
  W: { x: 0, y: -1 },
  E: { x: 0, y: 1 },
  S: { x: 1, y: 0 },

  NW: { x: -1, y: -1 },
  NE: { x: -1, y: 1 },
  SW: { x: 1, y: -1 },
  SE: { x: 1, y: 1 },
};

export class Grid<T> {
  private grid: T[][];
  private numRows: number;
  private numCols: number;

  constructor(existingGrid: T[][]);
  constructor(rows: number, cols: number, defaultValue: T);

  constructor(arg1: T[][] | number, arg2?: number, arg3?: T) {
    if (Array.isArray(arg1)) {
      this.numRows = arg1.length - 1;
      this.numCols = arg1[0].length - 1;
      this.grid = arg1;
    } else if (
      typeof arg1 === "number" &&
      typeof arg2 === "number" &&
      arg3 !== undefined
    ) {
      this.numRows = arg1;
      this.numCols = arg2;
      this.grid = Array.from({ length: arg1 }, () => Array(arg2).fill(arg3));
    } else {
      throw new Error("Invalid arguments for constructor");
    }
  }

  getPoint(point: Point): T {
    return this.grid[point.x][point.y];
  }

  get rowCount(): number {
    return this.numRows;
  }

  get colCount(): number {
    return this.numCols;
  }

  printGrid() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        process.stdout.write(`${this.getPoint({ x: i, y: j })}`);
      }
      process.stdout.write("\n");
    }
  }

  getPointNeighbor(point: Point, dir: Point): Point | null {
    const neighbour = {
      x: point.x + dir.x,
      y: point.y + dir.y,
    };
    if (
      neighbour.x >= 0 &&
      neighbour.x <= this.rowCount &&
      neighbour.y >= 0 &&
      neighbour.y <= this.colCount
    ) {
      return neighbour;
    } else return null;
  }
  getPointNeighborList(point: Point): Point[] {
    const neighbours: Point[] = [];
    for (const dir in Dirs) {
      const neighborDir = Dirs[dir];
      const neighbour = {
        x: point.x + neighborDir.x,
        y: point.y + neighborDir.y,
      };
      if (
        neighbour.x >= 0 &&
        neighbour.x <= this.rowCount &&
        neighbour.y >= 0 &&
        neighbour.y <= this.colCount
      ) {
        neighbours.push(neighbour);
      }
    }
    return neighbours;
  }
}
