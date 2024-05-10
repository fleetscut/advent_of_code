import { partOne, partTwo } from "./day9";
import path from "path";

describe("Day 9 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 114;
    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 2;
    expect(partTwo(input)).toEqual(output);
  });
});
