import { parse } from "url";
import { readAsStringArray } from "../utils/getInput";

const findPath = (input: string[]): [number[][], number] => {
  const plan = input.map((line) => line.split(" "));
  const points: number[][] = [];
  const current = [0, 0];
  let len = 0;
  points.push([...current]);

  for (const inst of plan) {
    const [dir, step, _] = inst;
    if (dir === "R") current[1] += parseInt(step);
    if (dir === "L") current[1] -= parseInt(step);
    if (dir === "D") current[0] += parseInt(step);
    if (dir === "U") current[0] -= parseInt(step);
    points.push([...current]);
    len += parseInt(step);
  }

  return [points, len];
};

const shoelace = (plan: [number[][], number]) => {
  const [points, len] = plan;
  let area = 0;
  for (let i = 0; i < points.length - 1; i++) {
    area += points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1];
  }
  //Doesnt really matter because starting at [0,0]
  area +=
    points[points.length - 1][0] * points[0][1] -
    points[0][0] * points[points.length - 1][1];

  // Picks theorom - Apicks = i + b/2 - 1
  // The number of interior points is the same wether calculating
  // through the middle of a cell, or along its exterior so:
  // ( i + b ) = Ashoe - b/2 + 1
  // i = Ashoe + b/2 + 1
  area = Math.abs(area) / 2 + len / 2 + 1;
  return area;
};

const decodeInput = (input: string[]): [number[][], number] => {
  const plan = input
    .map((line) => line.split(" ")[2])
    .map((line) => line.slice(2, line.length - 1));

  const points: number[][] = [];
  const current = [0, 0];
  let len = 0;
  points.push([...current]);

  for (const inst of plan) {
    const hex = inst.slice(0, 5);
    const dir = inst.slice(5);
    const step = parseInt(hex, 16);
    if (dir === "0") current[1] += step;
    if (dir === "2") current[1] -= step;
    if (dir === "1") current[0] += step;
    if (dir === "3") current[0] -= step;
    points.push([...current]);
    len += step;
  }
  return [points, len];
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  const plan = findPath(input);
  return shoelace(plan);
};

export const partTwo = (filename: string): number => {
  const input = readAsStringArray(filename);
  const plan = decodeInput(input);
  return shoelace(plan);
};
