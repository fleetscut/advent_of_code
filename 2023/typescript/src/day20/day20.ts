import { readAsStringArray } from "../utils/getInput";

type Broadcast = { type: "bc"; dest: string[] };
type FlipFlop = { type: "%"; state: boolean; dest: string[] };
type Conjunction = {
  type: "&";
  state: Record<string, boolean>;
  dest: string[];
};

type Modules = Map<string, Broadcast | FlipFlop | Conjunction>;
type ConfigItem = [string, "bc" | "%" | "&", string[]];

type Message = [string, boolean, string];

type Cycles = Record<string, boolean>;

const getConfiguration = (input: string[]): ConfigItem[] => {
  return input.map((line) => {
    const [name, dest] = line.split("->").map((item) => item.trim());
    const destList = dest.split(",").map((item) => item.trim());
    if (name === "broadcaster") return [name, "bc", destList] as ConfigItem;
    else return [name.slice(1), name[0], destList] as ConfigItem;
  });
};

const getModules = (config: ConfigItem[]) => {
  const modules: Modules = new Map();
  config.forEach(([name, type, dest]) => {
    if (type === "bc") modules.set(name, { type, dest });
    if (type === "%") modules.set(name, { type, state: false, dest });
    if (type === "&") modules.set(name, { type, state: {}, dest });
  });
  findConjunctionInputs(config, modules);
  return modules;
};

const findConjunctionInputs = (config: ConfigItem[], modules: Modules) => {
  const inputs = [];
  config.forEach(([name, type, _]) => {
    if (type === "&") {
      const mod = modules.get(name) as Conjunction;
      const inputs = config
        .filter(([_, __, dest]) => dest.includes(name))
        .map(([name, _, __]) => name);
      inputs.forEach((input) => (mod.state[input] = false));
    }
  });
};

const runConfiguration = (
  modules: Modules,
  cycles: Cycles | undefined,
): [number, number] => {
  const messageQueue: Message[] = [];
  let [lowPulse, highPulse] = [0, 0];
  messageQueue.push(["button", false, "broadcaster"]);
  while (messageQueue.length) {
    const [source, signal, dest] = messageQueue.shift() as Message;
    signal ? highPulse++ : lowPulse++;
    const mod = modules.get(dest)!;
    if (dest === "rx" && !signal) console.log("yes");
    if (!mod) continue;
    const targets = mod.dest;

    if (cycles !== undefined && source in cycles) {
      if (signal) cycles[source] = true;
    }
    if (mod.type === "bc") {
      targets.forEach((target) => messageQueue.push([dest, signal, target]));
    }
    if (mod.type === "%") {
      if (signal) continue;
      mod.state = !mod.state;
      targets.forEach((target) => messageQueue.push([dest, mod.state, target]));
    }
    if (mod.type === "&") {
      if (!mod.state[source]) mod.state[source] = false;
      mod.state[source] = signal;
      let output = true;
      if (Object.values(mod.state).every((state) => state)) {
        output = false;
      }
      targets.forEach((target) => messageQueue.push([dest, output, target]));
    }
  }
  return [highPulse, lowPulse];
};

const getCycleModules = (modules: Modules): Cycles => {
  const rxInput: string[] = [];
  modules.forEach((mod, idx) => {
    if (mod.dest.includes("rx")) rxInput.push(idx);
  });

  const cycles: Cycles = {};
  modules.forEach((mod, idx) => {
    if (mod.dest.includes(rxInput[0])) cycles[idx] = false;
  });
  return cycles;
};

const pressButton = (modules: Modules, count: number) => {
  let [lowPulses, highPulses] = [0, 0];
  for (let i = 0; i < count; i++) {
    const [low, high] = runConfiguration(modules, undefined);
    [lowPulses, highPulses] = [lowPulses + low, highPulses + high];
  }
  return lowPulses * highPulses;
};

const findCycles = (modules: Modules) => {
  const cycles = getCycleModules(modules);
  let [lowPulses, highPulses] = [0, 0];
  let presses = 0;
  let button = 1;
  while (Object.keys(cycles).length) {
    presses++;
    const [low, high] = runConfiguration(modules, cycles);
    [lowPulses, highPulses] = [lowPulses + low, highPulses + high];
    for (let i in cycles) {
      if (cycles[i]) {
        button *= presses;
        delete cycles[i];
      }
    }
  }
  return lowPulses * highPulses;
};

export const partOne = (filename: string): number => {
  const input = readAsStringArray(filename);
  const config = getConfiguration(input);
  const modules = getModules(config);
  return pressButton(modules, 1000);
};

export const partTwo = (filename: string): number => {
  const input = readAsStringArray(filename);
  const config = getConfiguration(input);
  const modules = getModules(config);
  return findCycles(modules);
};
