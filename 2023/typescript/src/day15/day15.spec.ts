import { partOne, partTwo } from "./day15";
import path from "path";

describe("Day 15 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 1320;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 145;

    expect(partTwo(input)).toEqual(output);
  });
});
