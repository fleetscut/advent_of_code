import { readAsStringArray } from "../utils/getInput";

const checkWinningPoints = (input: string[]) => {
  return input
    .map((game) => game.split(":")[1].split("|"))
    .map((game) =>
      checkCardPoints(
        new Set(game[0].trim().split(/\s+/)),
        game[1].trim().split(/\s+/),
      ),
    )
    .reduce((acc, num) => acc + num);
};

const checkWinning = (input: string[]) => {
  const numTickets = input.length;
  const prizeList: number[] = [];
  input
    .map((game) => game.split(":")[1].split("|"))
    .map((game) =>
      prizeList.push(
        checkCard(
          new Set(game[0].trim().split(/\s+/)),
          game[1].trim().split(/\s+/),
        ),
      ),
    );

  const cardCount = Array<number>(numTickets).fill(1);

  for (let i = 0; i < numTickets; i++) {
    const prize = prizeList[i];
    for (let j = 1; j <= prize; j++) {
      cardCount[i + j] = cardCount[i + j] + cardCount[i];
    }
  }

  return [...cardCount.values()].reduce((acc, val) => acc + val);
};

const checkCardPoints = (winning: Set<string>, ticket: string[]) => {
  let points = 0;
  ticket.forEach((num) => {
    if (winning.has(num)) {
      if (points == 0) points++;
      else points *= 2;
    }
  });
  return points;
};

const checkCard = (winning: Set<string>, ticket: string[]) => {
  let points = 0;
  ticket.forEach((num) => {
    if (winning.has(num)) {
      points++;
    }
  });
  return points;
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  return checkWinningPoints(input);
};

export const partTwo = (filename: string) => {
  const input = readAsStringArray(filename);
  return checkWinning(input);
};
