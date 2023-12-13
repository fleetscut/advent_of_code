import { partOne, partTwo } from "./day10";
import path from "path";

describe("Day 10 - TEST", () => {
  test("Part One - Example 1", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 4;

    // expect(partOne(input)).toEqual(output);
  });
  test("Part One - Example 2", () => {
    const input = path.join(import.meta.dir, "example2.txt");
    const output = 8;

    // expect(partOne(input)).toEqual(output);
  });
  test("Part Two - Example 3", () => {
    const input = path.join(import.meta.dir, "example3.txt");
    const output = 4;

    expect(partTwo(input)).toEqual(output);
  });
  test("Part Two - Example 4", () => {
    const input = path.join(import.meta.dir, "example4.txt");
    const output = 8;

    expect(partTwo(input)).toEqual(output);
  });
  test("Part Two - Example 5", () => {
    const input = path.join(import.meta.dir, "example5.txt");
    const output = 10;

    expect(partTwo(input)).toEqual(output);
  });
});
