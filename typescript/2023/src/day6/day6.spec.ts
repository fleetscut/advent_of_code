import { partOne, partTwo } from "./day6";
import path from "path";

describe("Day 6 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 288;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 71503;

    // expect(partOne(input)).toEqual(output);
    partTwo(input);
  });
});
