import { partOne, partTwo } from "./day13";
import path from "path";

describe("Day 13 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 405;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 400;

    expect(partTwo(input)).toEqual(output);
  });
});
