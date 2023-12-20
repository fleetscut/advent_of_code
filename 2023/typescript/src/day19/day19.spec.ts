import { partOne, partTwo } from "./day19";
import path from "path";

describe("Day 19 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 19114;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 19114;

    expect(partTwo(input)).toEqual(output);
  });
});
