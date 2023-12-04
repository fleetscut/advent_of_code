import { partOne, partTwo } from "./day3";
import path from "path";

describe("Day 3 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 4361;

    expect(partOne(input)).toEqual(output);
  });
});

describe("Day 3 - TEST", () => {
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 467835;

    expect(partTwo(input)).toEqual(output);
  });
});
