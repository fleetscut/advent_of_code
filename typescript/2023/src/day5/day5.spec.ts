import { partOne, partTwo } from "./day5";
import path from "path";

describe("Day 5 - Test", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 35;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 46;

    expect(partTwo(input)).toEqual(output);
  });
});
