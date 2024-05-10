import { readAsString } from "../utils/getInput";
import { HashMap } from "../utils/structures";

const runHolidayAsciiStringHelper = (key: string) => {
  let hash = 0;
  key.split("").forEach((c) => {
    hash = ((hash + c.charCodeAt(0)) * 17) % 256;
  });
  return hash;
};

const parseInstruction = (
  instruction: string,
  hashMap: HashMap<string, number>,
) => {
  const [label, op, val] = instruction.split(/(?=[-=])|(?<=[-=])/);
  if (op === "-") {
    hashMap.remove(label);
  } else if (op === "=") {
    hashMap.put(label, parseInt(val));
  }
};

const focusPower = (hashMap: HashMap<string, number>) => {
  let power = 0;
  for (const index of hashMap) {
    const table = hashMap.getIndex(index);
    for (let i = 0; i < table.length; i++) {
      power += (parseInt(index) + 1) * (i + 1) * table[i].value;
    }
  }
  return power;
};

export const partOne = (filename: string): number => {
  const input = readAsString(filename);
  const instructions = input.replace("\n", "").split(",");
  return instructions
    .map((i) => runHolidayAsciiStringHelper(i))
    .reduce((acc, val) => acc + val);
};

export const partTwo = (filename: string): number => {
  const input = readAsString(filename);
  const instructions = input.replace("\n", "").split(",");
  const hashMap = new HashMap<string, number>(runHolidayAsciiStringHelper);
  instructions.map((i) => parseInstruction(i, hashMap));
  return focusPower(hashMap);
};
