import { partOne, partTwo } from "./day20";
import path from "path";

describe("Day 20 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 32000000;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 0;

    expect(partTwo(input)).toEqual(output);
  });
});
