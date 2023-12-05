import { readAsStringArray } from "../utils/getInput";

const checkWinning = (input: string[]): number[] => {
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
  return prizeList;
};

const copyCards = (numTickets: number, prizeList: number[]) => {
  const cardCount = Array<number>(numTickets).fill(1);

  for (let i = 0; i < numTickets; i++) {
    const prize = prizeList[i];
    for (let j = 1; j <= prize; j++) {
      cardCount[i + j] = cardCount[i + j] + cardCount[i];
    }
  }

  return [...cardCount.values()].reduce((acc, val) => acc + val);
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
  const prizeList = checkWinning(input);
  return prizeList
    .map((prize) => {
      if (prize > 0) return Math.pow(2, prize - 1);
      else return 0;
    })
    .reduce((acc, val) => acc + val);
};

export const partTwo = (filename: string) => {
  const input = readAsStringArray(filename);
  const prizeList = checkWinning(input);
  return copyCards(input.length, prizeList);
};
