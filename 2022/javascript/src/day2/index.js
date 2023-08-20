const { getInput } = require("../utils");

const getMoves = (input) => {
  const moveMap = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
  return input
    .map((line) => line.split(" "))
    .map((m) => {
      return [moveMap[m[0]], moveMap[m[1]]];
    });
};

const partOne = (filename) => {
  const input = getInput.readAsArray(filename);
  const moves = getMoves(input);

  let score = 0;
  for (let move of moves) {
    const elf = move[0];
    const you = move[1];

    // +3 because javascript does remainder not modulo
    switch ((elf - you + 3) % 3) {
      case 0: //Draw
        score += 3;
        break;
      case 1: //Win
        score += 0;
        break;
      case 2: //Lose
        score += 6;
        break;
    }
    score += you;
  }

  console.log(score);
};
const partTwo = (filename) => {
  const input = getInput.readAsArray(filename);
  const moves = getMoves(input);

  const winMap = { 1: 2, 2: 3, 3: 1 };
  const loseMap = { 1: 3, 2: 1, 3: 2 };
  let score = 0;
  for (let move of moves) {
    switch (move[1]) {
      case 1: //Lose
        score += loseMap[move[0]];
        break;
      case 2: //Draw
        score += move[0] + 3;
        break;
      case 3: //Win
        score += winMap[move[0]] + 6;
        break;
    }
  }

  console.log(score);
};

module.exports = {
  partOne,
  partTwo,
};
