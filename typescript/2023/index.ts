import path from "path";

const runDay = process.argv[2];
const __dirname = import.meta.dir;

const dayPath = path.join(__dirname, `src/${runDay}/`);
const solution = await import(path.join(dayPath, `${runDay}.ts`));

console.log("Part One");
console.log(solution.partOne(path.join(dayPath, "input.txt")));
console.log("Part Two");
console.log(solution.partTwo(path.join(dayPath, "input.txt")));
