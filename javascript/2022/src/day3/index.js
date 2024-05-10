import * as getInput from "../utils/getInput.js";

const getSharedItem = (packs) => {
  return (
    packs
      .map((pack) => new Set(pack))
      // .reduce(([...a], [...b]) => b.filter(Set.prototype.has, new Set(a)))[0];
      .reduce(([...a], [...b]) => a.filter((val) => b.includes(val)))[0]
  );
};

const getGroupsSharedItem = (packs) => {
  const map1 = new Set(packs[0]);
  const map2 = new Set(packs[1]);
  const map3 = new Set(packs[2]);
  const intersection = [...map1]
    .filter((item) => map2.has(item))
    .filter((m) => map3.has(m));
  return intersection[0];
};

const getPriority = (item) => {
  if (item == item.toLowerCase()) {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  if (item == item.toUpperCase()) {
    return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
};
export const partOne = (filename) => {
  const input = getInput.readAsArray(filename);

  const sum = input
    .map((pack) => {
      const pack1 = pack.slice(0, pack.length / 2);
      const pack2 = pack.slice(pack.length / 2);

      return getSharedItem([pack1, pack2]);
    })
    .map((item) => getPriority(item))
    .reduce((acc, num) => acc + num, 0);
  console.log(`Total Priorities: ${sum}`);
};

export const partTwo = (filename) => {
  const input = getInput.readAsArray(filename);
  const sum = input
    .reduce((packs, pack, index) => {
      const i = Math.floor(index / 3);
      if (!Array.isArray(packs[i])) {
        packs[i] = [];
      }
      packs[i].push(pack);
      return packs;
    }, [])
    .map((packs) => getSharedItem(packs))
    .map((item) => getPriority(item))
    .reduce((acc, num) => acc + num, 0);
  console.log(`Total Priorities: ${sum}`);
};
