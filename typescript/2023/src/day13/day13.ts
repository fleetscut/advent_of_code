import { readAsString } from "../utils/getInput";

const getMirrorList = (input: string) => {
  return input.split("\n\n").map((list) => list.split("\n"));
};

const findReflection = (list: string[], fixSmudge: boolean = false): number => {
  for (let axis = 1; axis < list.length; axis++) {
    let top = list.slice(0, axis).reverse();
    let bottom = list.slice(axis, list.length);

    top.length < bottom.length
      ? (bottom = bottom.slice(0, top.length))
      : (top = top.slice(0, bottom.length));

    let smudge = false;
    let counts: number[] = [];
    const reflections = top.map((row, index) => {
      row.split("").forEach((rc, ri) => {
        if (bottom[index][ri] === rc) counts.push(0);
        else {
          counts.push(1);
        }
      });
      //   if (count === row.length - 1) {
      //     console.log(row);
      //     console.log(`${row.length} ${count}`);
      //     counts.push(count);
      //   }
      return row === bottom[index];
    });

    if (counts.reduce((acc, val) => acc + val) === 1) smudge = true;
    if (smudge && fixSmudge) {
      list.forEach((r) => console.log(r));
      console.log(counts);
      console.log(`smudge ${axis}`);
      console.log();
      return axis;
    }

    if (!fixSmudge && reflections.reduce((acc, val) => acc && val)) {
      console.log(`normal ${axis}`);
      return axis;
    }
  }
  console.log("");
  return 0;
};

//The glue eating step child
const findReflection2 = (list: string[], dir: string): number => {
  const transpose = dir.toLowerCase() === "x";
  const reflectionAxisMax = transpose ? list.length : list[0].length;
  const mirrorSize = transpose ? list[0].length : list.length;

  for (let rf = 0; rf < reflectionAxisMax; rf++) {
    let r1 = rf;
    let r2 = rf + 1;
    let mirrored = false;

    while (r1 >= 0 && r2 < reflectionAxisMax) {
      for (let i = 0; i < mirrorSize; i++) {
        if (
          transpose ? list[r1][i] !== list[r2][i] : list[i][r1] !== list[i][r2]
        ) {
          mirrored = false;
          break;
        }
        if (i === mirrorSize - 1) mirrored = true;
      }
      if (!mirrored) break;
      r1--;
      r2++;
    }
    if (mirrored) return rf;
  }
  return -1;
};

const transpose = (mirrors: string[]) => {
  const transposed = Array.from({ length: mirrors[0].length }, () =>
    Array(mirrors.length).fill(""),
  );
  for (let i = 0; i < mirrors.length; i++) {
    for (let j = 0; j < mirrors[i].length; j++) {
      transposed[j][i] = mirrors[i][j];
    }
  }

  return transposed.map((row) => row.join(""));
};

export const partOne = (filename: string): number => {
  const input = readAsString(filename);
  const list = getMirrorList(input);
  return list
    .map((mirror) => {
      // mirror.forEach((r) => console.log(r));
      const transposedList = transpose(mirror);
      // transposedList.forEach((r) => console.log(r));
      return 100 * findReflection(mirror) + findReflection(transposedList);
    })
    .reduce((acc, val) => acc + val);
};

export const partTwo = (filename: string): number => {
  const input = readAsString(filename);
  const list = getMirrorList(input);
  return list
    .map((mirror) => {
      // mirror.forEach((r) => console.log(r));
      // console.log("-----");
      const transposedList = transpose(mirror);
      // transposedList.forEach((r) => console.log(r));
      // console.log("#####");
      return (
        100 * findReflection(mirror, true) +
        findReflection(transposedList, true)
      );
    })
    .reduce((acc, val) => acc + val);
};
