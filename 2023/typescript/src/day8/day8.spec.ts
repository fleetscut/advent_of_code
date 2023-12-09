import { partOne, partTwo } from "./day8";
import path from "path";

describe("Day Two - TEST", () => {
  test("Part One - Example 1", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 2;

    expect(partOne(input)).toEqual(output);
    partOne(input);
  });
  test("Part One - Example 2", () => {
    const input = path.join(import.meta.dir, "example2.txt");
    const output = 6;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two - Example 1", () => {
    const input = path.join(import.meta.dir, "example3.txt");
    const output = 6;

    // expect(partTwo(input)).toEqual(output);
    partTwo(input);
  });
});
