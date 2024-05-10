import * as getInput from "../utils/getInput.js";

const getCalories = (input, topNum) => {
  let calories = input.split(/\n\s*\n/).map((line) => {
    return line
      .split("\n")
      .map((cal) => parseInt(cal))
      .reduce((acc, val) => acc + val, 0);
  });

  calories.sort((a, b) => b - a);
  let topSum = 0;
  for (let i = 0; i < topNum; i++) {
    topSum += calories[i];
  }
  console.log(`Highest Calories: ${topSum}`);
};

export const partOne = (filename) => {
  const input = getInput.readAsString(filename);

  getCalories(input, 1);
};

export const partTwo = (filename) => {
  const input = getInput.readAsString(filename);

  getCalories(input, 3);
};
