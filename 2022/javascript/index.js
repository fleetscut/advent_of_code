const fs = require("fs");
const path = require("path");

const day = process.argv[2];

const dayPath = path.join(__dirname, `src/${day}`);
const solution = require(dayPath);

const testFilename = path.join(__dirname, `src/${day}/example.txt`);
const filename = path.join(__dirname, `src/${day}/input.txt`);

if (process.argv[3] === "test") {
  console.log("Test Part One");
  solution.partOne(testFilename);
  console.log("Test Part Two:");
  solution.partTwo(testFilename);
} else {
  console.log("Part One:");
  solution.partOne(filename);
  console.log("Part Two:");
  solution.partTwo(filename);
}
