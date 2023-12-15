import { readAs2DArray } from "../utils/getInput";

const tilt = (input: string[][]): number => {
  let score = 0;
  for (let j = 0; j < input[0].length; j++) {
    let last = 0;
    if (input[0][j] === "O") {
      score += input.length;
    }
    for (let i = 1; i < input.length; i++) {
      if (input[last][j] !== "." && input[i][j].match(/[.#]/)) last = i;
      if (input[i][j] === "#") last = i;
      if (input[i][j] === "O") {
        if (input[last][j] === ".") {
          input[last][j] = "O";
          input[i][j] = ".";
          score += input.length - last;
          last++;
        } else {
          score += input.length - i;
        }
      }
    }
  }
  return score;
};

const runCycles = (input: string[][], cycles: number) => {
  const seen: string[] = [];
  let store = "";
  let end = 0;
  while (true) {
    end++;
    for (let i = 0; i < 4; i++) {
      // cant take the score if its rotated d'oh
      tilt(input);
      input = rotateClockwise(input);
    }
    store = input.map((row) => row.join("")).join("");
    if (!seen.includes(store)) seen.push(store);
    else break;
  }
  const start = seen.indexOf(store) + 1;

  const maxIndex = ((cycles - start) % (end - start)) + start;
  // console.log(maxIndex);
  // console.log(`${start} ${end}`);
  // console.log(seen[maxIndex - 1]);
  let tmp = 0;
  const grid = seen[maxIndex - 1];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (grid[i * input[0].length + j] === "O") tmp += input.length - i;
      console.write(grid[i * input[0].length + j]);
    }
    console.log();
  }
  console.log(tmp);
};

const rotateClockwise = (input: string[][]) => {
  return input[0].map((val, index) => input.map((row) => row[index]).reverse());
};

export const partOne = (filename: string) => {
  const input = readAs2DArray(filename, String);
  return tilt(input);
};

export const partTwo = (filename: string) => {
  let input = readAs2DArray(filename, String);
  runCycles(input, 1000000000);
  return 0;
};
