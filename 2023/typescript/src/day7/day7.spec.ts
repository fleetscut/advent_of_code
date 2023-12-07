import { partOne, partTwo } from "./day7";
import path from "path";

describe("Day 7 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 6440;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 0;

    // expect(partTwo(input)).toEqual(output);
    // partTwo(input);
  });
});
