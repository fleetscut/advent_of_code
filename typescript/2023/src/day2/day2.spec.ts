import { partOne, partTwo } from "./day2";
import path from "path";

describe("Day 2 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 8;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 2286;

    expect(partTwo(input)).toEqual(output);
  });
});

describe("Day 2 - TEST", () => {});
