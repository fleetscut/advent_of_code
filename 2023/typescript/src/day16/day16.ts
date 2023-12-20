import { readAs2DArray } from "../utils/getInput";
import { Point } from "../utils/grid";

type Beam = { pos: Point; dir: Point };

const updateBeams = (grid: string[][], start: Beam) => {
  let current = start;

  const beams: Beam[] = [];
  let power: Set<string> = new Set();

  beams.push(current);

  while (beams.length !== 0) {
    current = beams.shift()!;
    current.pos.x += current.dir.x;
    current.pos.y += current.dir.y;

    if (
      current.pos.x < 0 ||
      current.pos.x >= grid.length ||
      current.pos.y < 0 ||
      current.pos.y >= grid[0].length
    ) {
      continue;
    }
    switch (grid[current.pos.x][current.pos.y]) {
      case "/":
        [current.dir.x, current.dir.y] = [-current.dir.y, -current.dir.x];
        if (!power.has(beamToString(current))) {
          power.add(beamToString(current));
          beams.push(current);
        }
        break;
      case "\\":
        [current.dir.x, current.dir.y] = [current.dir.y, current.dir.x];
        if (!power.has(beamToString(current))) {
          power.add(beamToString(current));
          beams.push(current);
        }
        break;
      case "|":
        if (current.dir.x === 0) {
          const nextUp = {
            pos: { x: current.pos.x, y: current.pos.y },
            dir: { x: -1, y: 0 },
          };
          const nextDown = {
            pos: { x: current.pos.x, y: current.pos.y },
            dir: { x: 1, y: 0 },
          };
          if (!power.has(beamToString(nextUp))) {
            beams.push(nextUp);
            power.add(beamToString(nextUp));
          }
          if (!power.has(beamToString(nextDown))) {
            beams.push(nextDown);
            power.add(beamToString(nextDown));
          }
        } else {
          power.add(beamToString(current));
          beams.push(current);
        }
        break;
      case "-":
        if (current.dir.y === 0) {
          const nextLeft = {
            pos: { x: current.pos.x, y: current.pos.y },
            dir: { x: 0, y: -1 },
          };
          const nextRight = {
            pos: { x: current.pos.x, y: current.pos.y },
            dir: { x: 0, y: 1 },
          };
          if (!power.has(beamToString(nextLeft))) {
            beams.push(nextLeft);
            power.add(beamToString(nextLeft));
          }
          if (!power.has(beamToString(nextRight))) {
            beams.push(nextRight);
            power.add(beamToString(nextRight));
          }
        } else {
          power.add(beamToString(current));
          beams.push(current);
        }

        break;

      default:
        power.add(beamToString(current));
        beams.push(current);
        break;
    }
  }

  const powerYes = new Set(
    Array.from(power)
      .map((r) => r.split(","))
      .map((p) => p[0] + "," + p[1]),
  );
  return powerYes.size;
};

const scanEdges = (grid: string[][]) => {
  let max = 0;
  let maxPos = [0, 0];

  //top
  for (let i = -1; i < grid.length; i++) {
    const start: Beam = { pos: { x: 0, y: i }, dir: { x: 1, y: 0 } };
    const power = updateBeams(grid, start);
    if (power > max) {
      max = power;
      maxPos = [0, i];
    }
  }

  //bottom
  for (let i = -1; i < grid.length; i++) {
    const start: Beam = {
      pos: { x: grid.length - 1, y: i },
      dir: { x: -1, y: 0 },
    };
    const power = updateBeams(grid, start);
    if (power > max) {
      max = power;
      maxPos = [grid.length - 1, i];
    }
  }

  //left
  for (let i = -1; i < grid[0].length; i++) {
    const start: Beam = {
      pos: { x: i, y: 0 },
      dir: { x: 0, y: 1 },
    };
    const power = updateBeams(grid, start);
    if (power > max) {
      max = power;
      maxPos = [i, 0];
    }
  }

  //right
  for (let i = -1; i < grid[0].length; i++) {
    const start: Beam = {
      pos: { x: i, y: grid[0].length - 1 },
      dir: { x: 0, y: -1 },
    };
    const power = updateBeams(grid, start);
    if (power > max) {
      max = power;
      maxPos = [i, grid[0].length - 1];
    }
  }
  return max;
};

const beamToString = (beam: Beam) => {
  return `${beam.pos.x},${beam.pos.y},${beam.dir.x},${beam.dir.y}`;
};

export const partOne = (filename: string): number => {
  const input = readAs2DArray(filename, String);
  const start: Beam = { pos: { x: 0, y: -1 }, dir: { x: 0, y: 1 } };
  return updateBeams(input, start);
};

export const partTwo = (filename: string): number => {
  const input = readAs2DArray(filename, String);
  return scanEdges(input);
};
