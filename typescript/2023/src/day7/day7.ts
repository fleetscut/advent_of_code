import { readAsStringArray } from "../utils/getInput";

type Hand = {
  hand: string;
  bid: number;
  score: number;
};

const rankHands = (input: string[], handleJoker: boolean = false): Hand[] => {
  let hands = input
    .map((line) => line.split(" "))
    .map((hand) => {
      let handMap = new Map();
      let hasJoker = false;
      hand[0].split("").forEach((c) => {
        if (c === "J") hasJoker = true;
        if (handMap.has(c)) handMap.set(c, handMap.get(c) + 1);
        else handMap.set(c, 1);
      });
      if (handleJoker && hasJoker) handMap = replaceJokers(handMap);
      return {
        hand: hand[0],
        bid: parseInt(hand[1]),
        score: scoreHand(handMap),
      };
    });
  hands = hands.sort((a, b) => {
    if (a.score === b.score) {
      return compareCards(a.hand, b.hand, handleJoker);
    } else return a.score - b.score;
  });
  return hands;
};

const replaceJokers = (hand: Map<string, number>): Map<string, number> => {
  let lv = 0;
  let lk = "";
  hand.forEach((v, k) => {
    if (v > lv && k !== "J") {
      lv = v;
      lk = k;
    }
  });
  let jv = hand.get("J");
  if (jv === undefined) throw Error;
  hand.delete("J");
  hand.set(lk, lv + jv);
  return hand;
};

const compareCards = (
  card1: string,
  card2: string,
  handleJoker: boolean = false,
): number => {
  const c1 = Array.from(card1);
  const c2 = Array.from(card2);
  const cardStrength = handleJoker ? "J23456789TQKA" : "23456789JTQKA";

  for (let i = 0; i < c1.length; i++) {
    if (cardStrength.indexOf(c1[i]) > cardStrength.indexOf(c2[i])) return 1;
    else if (cardStrength.indexOf(c1[i]) < cardStrength.indexOf(c2[i]))
      return -1;
  }

  return 0;
};

const scoreHand = (hand: Map<string, number>) => {
  let score = 0;
  if (hand.size === 1) score = 7;
  else if (hand.size === 2) {
    hand.forEach((v, _) => {
      if (v === 4) score = 6;
      else if (v === 3) score = 5;
    });
  } else if (hand.size === 3) {
    hand.forEach((v, _) => {
      if (v === 3) score = 4;
      else if (v === 2) score = 3;
    });
  } else if (hand.size === 4) score = 2;
  else if (hand.size === 5) score = 1;
  return score;
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  const hands = rankHands(input);
  return hands
    .map((hand, index) => {
      return hand.bid * (index + 1);
    })
    .reduce((acc, val) => acc + val);
};

export const partTwo = (filename: string): number => {
  const input = readAsStringArray(filename);
  const hands = rankHands(input, true);
  return hands
    .map((hand, index) => {
      return hand.bid * (index + 1);
    })
    .reduce((acc, val) => acc + val);
};
