import { partOne, partTwo } from "./day12";
import path from "path";

describe("Day 12 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 21;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 525152;

    expect(partTwo(input)).toEqual(output);
  });
});
