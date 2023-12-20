import { partOne, partTwo } from "./day16";
import path from "path";

describe("Day 16", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 46;

    expect(partOne(input)).toEqual(output);
  });
  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 51;

    expect(partTwo(input)).toEqual(output);
  });
});
