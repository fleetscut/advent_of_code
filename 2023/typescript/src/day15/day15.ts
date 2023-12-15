import { readAsString } from "../utils/getInput";

type HashMap = { [index: number]: { key: string; value: number }[] };

const put = (hashMap: HashMap, obj: [number, string, number]) => {
  const [hash, key, val] = obj;
  if (!hashMap[hash]) {
    hashMap[hash] = [{ key: key, value: val }];
  } else {
    let found = false;
    for (const list of hashMap[hash]) {
      if (list.key === key) {
        found = true;
        list.value = val;
      }
    }
    if (!found) hashMap[hash].push({ key: key, value: val });
  }
};

const runHolidayAsciiStringHelper = (input: string) => {
  let hash = 0;
  input.split("").forEach((c) => {
    hash = ((hash + c.charCodeAt(0)) * 17) % 256;
  });
  return hash;
};

const parseInstruction = (instruction: string, hashMap: HashMap) => {
  // console.log(instruction);
  const [label, op, val] = instruction.split(/(?=[-=])|(?<=[-=])/);
  const labelHash = runHolidayAsciiStringHelper(label);
  if (op === "-") {
    // remove and adjust
    if (hashMap[labelHash]) {
      hashMap[labelHash] = hashMap[labelHash].filter(
        (box) => box.key !== label,
      );
    }
  } else if (op === "=") {
    put(hashMap, [labelHash, label, parseInt(val)]);
  }
  // console.log(hashMap);
};

const focusPower = (hashMap: HashMap) => {
  let power = 0;
  for (const index in hashMap) {
    // console.log(hashMap[index]);
    let lensPower = 0;

    for (let i = 0; i < hashMap[index].length; i++) {
      power += (parseInt(index) + 1) * (i + 1) * hashMap[index][i].value;
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
  const hashMap: HashMap = {} as HashMap;
  instructions.map((i) => parseInstruction(i, hashMap));
  return focusPower(hashMap);
};
