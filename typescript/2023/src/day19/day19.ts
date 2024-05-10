import { readAsString, readAsStringArray } from "../utils/getInput";

type Rules = string[][];
type WorkFlow = Map<string, Rules>;

type Part = [string, number];
type PartsMap = Map<string, number>;
type PartsList = PartsMap[];

type Values = Record<string, [number, number]>;

const getWorkflows = (input: string): [WorkFlow, PartsList] => {
  const [flows, parts] = input.split("\n\n");

  const workMap = new Map<string, Rules>();
  flows.split("\n").map((wf) => {
    const [name, rules] = wf.slice(0, wf.length - 1).split("{");
    const rulesArray = rules
      .split(",")
      .map((rule) => rule.split(/(?=[<>=:])|(?<=[<>=:])/));
    workMap.set(name, rulesArray);
  });

  const partsList = parts.split("\n").map((list) => {
    const parts: Part[] = list
      .slice(1, list.length - 1)
      .split(",")
      .map((part) => {
        const [key, val] = part.split("=");
        return [key, parseInt(val)];
      });
    const tmp = new Map(parts);
    return new Map(parts);
  });

  return [workMap, partsList];
};

const sortParts = (parts: PartsMap, flows: WorkFlow): number => {
  let currentOp = "in";
  while (currentOp !== "A" && currentOp !== "R") {
    // console.log(`op ${currentOp}`);
    const branches = flows.get(currentOp)!;
    partLoop: for (let i = 0; i <= branches.length - 1; i++) {
      // console.log(`i ${i} ${branches[i]}`);
      if (branches[i].length !== 1) {
        const [part, op, val, _, nextOp] = branches[i];
        // console.log(`branch ${part} ${op} ${val} ${nextOp}`);
        // console.log(parts.get(part));
        switch (op) {
          case ">":
            if (parts.get(part)! > parseInt(val)) {
              currentOp = nextOp;
              break partLoop;
            }
            break;
          case "<":
            if (parts.get(part)! < parseInt(val)) {
              currentOp = nextOp;
              break partLoop;
            }
            break;
        }
      } else {
        currentOp = branches[i][0];
      }
    }
  }
  if (currentOp === "A") {
    return Array.from(parts)
      .map((rule) => rule[1])
      .reduce((acc, val) => acc + val);
  }
  return 0;
};

const findPaths = (
  flows: WorkFlow,
  currentOp: string,
  values: Values,
): number => {
  if (currentOp === "R") {
    return 0;
  }
  if (currentOp === "A") {
    let value = 1;
    for (let item in values) {
      value *= values[item][1] - values[item][0] + 1;
    }
    return value;
  }
  let total = 0;
  const branches = flows.get(currentOp)!;
  for (let i = 0; i <= branches.length - 1; i++) {
    if (branches[i].length !== 1) {
      const [part, op, val, _, nextOp] = branches[i];
      let [low, high] = values[part];
      let tPath = [0, 0];
      let fPath = [0, 0];
      switch (op) {
        case ">":
          tPath = [parseInt(val) + 1, high];
          fPath = [low, parseInt(val)];
          break;
        case "<":
          tPath = [low, parseInt(val) - 1];
          fPath = [parseInt(val), high];
          break;
      }
      // Only need to proceed if its a valid range
      if (tPath[0] <= tPath[1]) {
        const newValues = { ...values };
        newValues[part] = tPath as [number, number];
        total += findPaths(flows, nextOp, newValues);
      }
      if (fPath[0] <= fPath[1]) {
        // values = { ...values };
        values[part] = fPath as [number, number];
      } else {
        break;
      }
    } else {
      total += findPaths(flows, branches[i][0], values);
    }
  }
  return total;
};

export const partOne = (filename: string): number => {
  const input = readAsString(filename);
  const [flows, parts] = getWorkflows(input);
  const tmp = parts
    .map((list) => {
      const t = sortParts(list, flows);
      return t!;
    })
    .reduce((acc, val) => acc + val);
  return tmp;
};

export const partTwo = (filename: string): number => {
  const input = readAsString(filename);
  const [flows, parts] = getWorkflows(input);
  const values: Values = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  };
  const tmp = findPaths(flows, "in", values);
  console.log(tmp);
  return 0;
};
