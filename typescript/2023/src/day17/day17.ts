import { readAs2DArray } from "../utils/getInput";
import { Point, Dirs } from "../utils/grid";

type State = {
  heat: number;
  pos: Point;
  dir: Point;
  steps: number;
};

const dijkstra = (grid: number[][], start: Point, dest: Point): number => {
  const visited = new Set();
  const priorityQueue: State[] = [];
  const dirs = [Dirs.N, Dirs.W, Dirs.S, Dirs.E];
  priorityQueue.push({ heat: 0, pos: start, dir: { x: 0, y: 0 }, steps: 0 });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.heat - b.heat);
    const current = priorityQueue.shift()!;

    if (current.pos.x === dest.x && current.pos.y === dest.y) {
      return current.heat;
    }

    const key = `${current.pos.x},${current.pos.y},${current.dir.x},${current.dir.y},${current.steps}`;
    // const key = `${current.pos.x},${current.pos.y},${current.dir.x}${current.dir.y}`;
    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    if ((current.dir.x !== 0 || current.dir.y !== 0) && current.steps < 3) {
      const next = {
        x: current.pos.x + current.dir.x,
        y: current.pos.y + current.dir.y,
      };
      if (
        next.x >= 0 &&
        next.x < grid.length &&
        next.y >= 0 &&
        next.y < grid[0].length
      ) {
        priorityQueue.push({
          heat: current.heat + grid[next.x][next.y],
          pos: { ...next },
          dir: {
            x: current.dir.x,
            y: current.dir.y,
          },
          steps: current.steps + 1,
        });
      }
    }
    for (const dir of dirs) {
      if (
        !(current.dir.x === dir.x && current.dir.y === dir.y) &&
        !(current.dir.x === -dir.x && current.dir.y === -dir.y)
      ) {
        const next = {
          x: current.pos.x + dir.x,
          y: current.pos.y + dir.y,
        };
        if (
          next.x >= 0 &&
          next.x < grid.length &&
          next.y >= 0 &&
          next.y < grid[0].length
        ) {
          priorityQueue.push({
            heat: current.heat + grid[next.x][next.y],
            pos: { ...next },
            dir: {
              x: dir.x,
              y: dir.y,
            },
            steps: 1,
          });
        }
      }
    }
  }
  return -1;
};

const dijkstra2 = (grid: number[][], start: Point, dest: Point): number => {
  const visited = new Set();
  const priorityQueue: State[] = [];
  const dirs = [Dirs.N, Dirs.W, Dirs.S, Dirs.E];
  priorityQueue.push({ heat: 0, pos: start, dir: { x: 0, y: 0 }, steps: 0 });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.heat - b.heat);
    const current = priorityQueue.shift()!;

    if (
      current.pos.x === dest.x &&
      current.pos.y === dest.y &&
      current.steps >= 4
    ) {
      return current.heat;
    }

    const key = `${current.pos.x},${current.pos.y},${current.dir.x},${current.dir.y},${current.steps}`;
    // const key = `${current.pos.x},${current.pos.y},${current.dir.x}${current.dir.y}`;
    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    if ((current.dir.x !== 0 || current.dir.y !== 0) && current.steps < 10) {
      const next = {
        x: current.pos.x + current.dir.x,
        y: current.pos.y + current.dir.y,
      };
      if (
        next.x >= 0 &&
        next.x < grid.length &&
        next.y >= 0 &&
        next.y < grid[0].length
      ) {
        priorityQueue.push({
          heat: current.heat + grid[next.x][next.y],
          pos: { ...next },
          dir: {
            x: current.dir.x,
            y: current.dir.y,
          },
          steps: current.steps + 1,
        });
      }
    }
    if ((current.dir.x === 0 && current.dir.y === 0) || current.steps >= 4) {
      for (const dir of dirs) {
        if (
          !(current.dir.x === dir.x && current.dir.y === dir.y) &&
          !(current.dir.x === -dir.x && current.dir.y === -dir.y)
        ) {
          const next = {
            x: current.pos.x + dir.x,
            y: current.pos.y + dir.y,
          };
          if (
            next.x >= 0 &&
            next.x < grid.length &&
            next.y >= 0 &&
            next.y < grid[0].length
          ) {
            priorityQueue.push({
              heat: current.heat + grid[next.x][next.y],
              pos: { ...next },
              dir: {
                x: dir.x,
                y: dir.y,
              },
              steps: 1,
            });
          }
        }
      }
    }
  }
  return -1;
};

export const partOne = (filename: string): number => {
  const input = readAs2DArray(filename, Number);
  const tmp = dijkstra(
    input,
    { x: 0, y: 0 },
    { x: input.length - 1, y: input[0].length - 1 },
  );
  console.log(tmp);
  return tmp;
};

export const partTwo = (filename: string): number => {
  const input = readAs2DArray(filename, Number);
  const tmp = dijkstra2(
    input,
    { x: 0, y: 0 },
    { x: input.length - 1, y: input[0].length - 1 },
  );
  console.log(tmp);
  return tmp;
};
