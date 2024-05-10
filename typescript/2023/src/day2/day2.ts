import { readAsStringArray } from "../utils/getInput";

type RGB = {
  [id: string]: number;
};

const validate = (
  input: string[],
  red: number,
  blue: number,
  green: number,
): [number[], number[]] => {
  const map: RGB = {
    red: red,
    blue: blue,
    green: green,
  };
  const validGames: number[] = [];
  const power: number[] = [];
  input.map((game) => {
    const [id, cubes] = game.replace("Game ", "").split(":");
    const minimum: RGB = {
      red: 0,
      blue: 0,
      green: 0,
    };
    const validGame = cubes
      .split(";")
      .map((sets) =>
        sets
          .split(",")
          .map((set) => {
            const [count, color] = set.trim().split(" ");
            if (parseInt(count) > minimum[color])
              minimum[color] = parseInt(count);
            return parseInt(count) <= map[color];
          })
          .reduce((acc, set) => acc && set),
      )
      .reduce((acc, sets) => acc && sets);
    if (validGame) validGames.push(parseInt(id));
    power.push(minimum.red * minimum.blue * minimum.green);
  });
  return [validGames, power];
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  const [ids, _] = validate(input, 12, 14, 13);
  return ids.reduce((acc, id) => acc + id);
};

export const partTwo = (filename: string): number => {
  const input = readAsStringArray(filename);
  const [_, power] = validate(input, 12, 14, 13);
  return power.reduce((acc, pow) => acc + pow);
};
