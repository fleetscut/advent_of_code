import fs from "fs";

const createStack = (stackData) => {
  const stacks = [];
  stackData
    .slice(0, -1)
    .reverse()
    .map((line) =>
      line.split("").forEach((c, index) => {
        const i = Math.floor(index / 4);
        if (c.match(/[A-Z]/)) {
          if (!Array.isArray(stacks[i])) {
            stacks[i] = [];
          }
          stacks[i].push(c);
        }
      }),
    );
  return stacks;
};

const playMoves = (moves, stacks, version) => {
  moves
    .slice(0, -1) // remove null line
    .map((line) => line.split(" "))
    .forEach((move) => {
      const fromStack = stacks[move[3] - 1];
      const toStack = stacks[move[5] - 1];
      const size = move[1];
      if (version === 9000) {
        for (let i = 0; i < size; i++) {
          toStack.push(fromStack.pop());
        }
      }
      if (version === 9001) {
        const temp = fromStack.splice(fromStack.length - size);
        toStack.push(...temp);
      }
    });
};

export const partOne = (filename) => {
  const input = fs.readFileSync(filename, "utf-8"); // need leading spaces
  const [stacksString, moves] = input
    .split(/\n\n/)
    .map((line) => line.split("\n"));

  const stacks = createStack(stacksString);
  playMoves(moves, stacks, 9000);

  const message = stacks.map((stack) => stack.slice(-1)).join("");
  console.log(`Message: ${message}`);
};

export const partTwo = (filename) => {
  const input = fs.readFileSync(filename, "utf-8"); // need leading spaces
  const [stacksString, moves] = input
    .split(/\n\n/)
    .map((line) => line.split("\n"));

  const stacks = createStack(stacksString);
  playMoves(moves, stacks, 9001);

  const message = stacks.map((stack) => stack.slice(-1)).join("");
  console.log(`Message: ${message}`);
};
