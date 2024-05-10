import { partOne, partTwo } from "./day17";
import path from "path";

describe("Day 17 - TEST", () => {
  test("Part One", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 102;

    expect(partOne(input)).toEqual(output);
  });

  test("Part Two", () => {
    const input = path.join(import.meta.dir, "example.txt");
    const output = 94;

    expect(partTwo(input)).toEqual(output);
  });
});
