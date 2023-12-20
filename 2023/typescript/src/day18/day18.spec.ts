import { partOne, partTwo } from "./day18";
import path from "path";

describe("Day 18 - Test", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 62;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 952408144115;

    expect(partTwo(input)).toEqual(output);
  });
});
