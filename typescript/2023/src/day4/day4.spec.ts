import { partOne, partTwo } from "./day4";
import path from "path";

describe("Day 4 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 13;

    // expect(partOne(input)).toEqual(output);
    partOne(input);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 30;

    expect(partTwo(input)).toEqual(output);
  });
});
