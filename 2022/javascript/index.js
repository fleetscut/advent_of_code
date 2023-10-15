import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const day = process.argv[2];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dayPath = path.join(__dirname, `src/${day}/index.js`);
const solution = await import(dayPath);

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
