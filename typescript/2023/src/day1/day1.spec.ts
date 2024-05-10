import { partOne, partTwo } from "./day1";
import path from "path";

describe("Day 1 - TEST", () => {
  test("Part One:", () => {
    const dir = import.meta.dir;
    const input = path.join(dir, "example.txt");
    const output = 142;

    expect(partOne(input)).toEqual(output);
  });
});

describe("Day 1 - TEST", () => {
  test("Part Two:", () => {
    const dir = import.meta.dir;
    const input = path.join(dir, "example2.txt");
    const output = 281;

    expect(partTwo(input)).toEqual(output);
  });
});
