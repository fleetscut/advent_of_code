import * as getInput from "../utils/getInput.js";

export const partOne = (filename) => {
  const input = getInput.readAsArray(filename);

  const contains = input
    .map((pair) => pair.split(","))
    .map((sections) => sections.map((section) => section.split("-")))
    .map((pair) =>
      (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
      (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1])
        ? true
        : false,
    )
    .reduce((acc, num) => acc + num);
  console.log(`Number of containing pairs: ${contains}`);
};
export const partTwo = (filename) => {
  const input = getInput.readAsArray(filename);
  const overlaps = input
    .map((pair) => pair.split(","))
    .map((sections) =>
      sections.map((section) => section.split("-").map(Number)),
    )
    .map((pair) => {
      console.log(pair);
      const result =
        (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
        (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1])
          ? true
          : false;
      console.log(result);
      return result;
    })
    .reduce((acc, num) => acc + num);
  console.log(`Number of overlapping pairs: ${overlaps}`);
};
