import { readAsString } from "../utils/getInput";

const getSettings = (input: string): [number[], number[][][]] => {
  const [seedsString, ...maps] = input.split("\n\n");
  const seeds = seedsString
    .split(":")[1]
    .trim()
    .split(" ")
    .map((val) => parseInt(val));
  const settings = maps
    .map((mapSection) => mapSection.split("\n").slice(1))
    .map((mapSection) =>
      mapSection.map((line) => line.split(" ").map((val) => parseInt(val))),
    );
  return [seeds, settings];
};

const runMap = (settings: number[][], seeds: number[]) => {
  for (let index in seeds) {
    const seed = seeds[index];
    settings.forEach((line) => {
      const [destStart, sourceStart, range] = line;
      if (seed >= sourceStart && seed < sourceStart + range) {
        seeds[index] = destStart + (seed - sourceStart);
      }
    });
  }
};

const runMapRange = (settings: number[][], seeds: number[][]): number[][] => {
  const mappedSeeds: number[][] = [];
  let unmappedSeeds: number[][] = [];
  settings.forEach((line) => {
    unmappedSeeds = [];
    const [destStart, sourceStart, range] = line;
    const sourceEnd = sourceStart + range;
    seeds.forEach((seed) => {
      const seedStart = seed[0];
      const seedEnd = seed[1];
      const start = [seedStart, Math.min(seedEnd, sourceStart)];
      const mid = [
        Math.max(seedStart, sourceStart),
        Math.min(seedEnd, sourceEnd),
      ];
      const end = [Math.max(sourceEnd, seedStart), seedEnd];
      if (start[1] > start[0]) unmappedSeeds.push(start);
      if (mid[1] > mid[0])
        mappedSeeds.push([
          mid[0] - sourceStart + destStart,
          mid[1] - sourceStart + destStart,
        ]);
      if (end[1] > end[0]) unmappedSeeds.push(end);
    });
    seeds = unmappedSeeds;
  });

  return mappedSeeds.concat(seeds);
};

const expandSeeds = (seeds: number[]): number[][] => {
  const expanded = [];
  for (let i = 0; i < seeds.length; i += 2) {
    expanded.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
  }
  return expanded;
};

export const partOne = (filename: string): number => {
  const input = readAsString(filename);
  let [seeds, settings] = getSettings(input);
  settings.forEach((setting) => runMap(setting, seeds));
  // WHY DOES SORT CONVERT TO STRINGS??????????????
  return seeds.sort((a, b) => a - b)[0];
};

export const partTwo = (filename: string): number => {
  const input = readAsString(filename);
  const [seeds, settings] = getSettings(input);
  let seedRanges = expandSeeds(seeds);
  settings.forEach(
    (setting) => (seedRanges = runMapRange(setting, seedRanges)),
  );
  // WHY DOES SORT CONVERT TO STRINGS??????????????
  return seedRanges.map((range) => range[0]).sort((a, b) => a - b)[0];
};
