import * as getInput from "../utils/getInput.js";

const findMarker = (packet, index) => {
  for (let i = index; i < packet.length; i++) {
    const map = new Map();
    for (let j = i - index; j < i; j++) {
      if (map.has(packet[j])) {
        map.set(packet[j], map.get(packet[j]) + 1);
      } else {
        map.set(packet[j], 1);
      }
    }
    if (map.size === index) {
      return i;
    }
  }
};

export const partOne = (filename) => {
  //if filename contains example
  if (filename.includes("example")) {
    for (let i = 1; i <= 5; i++) {
      const examplefile = filename.split(".")[0] + "1-" + i + ".txt";

      const input = getInput.readAsString(examplefile);

      const marker = findMarker(input, 4);
      console.log(`Input has first marker after character ${marker}`);
    }
  } else {
    const input = getInput.readAsString(filename);

    const marker = findMarker(input, 4);
    console.log(`Input has first marker after character ${marker}`);
  }
};

export const partTwo = (filename) => {
  if (filename.includes("example")) {
    for (let i = 1; i <= 5; i++) {
      const examplefile = filename.split(".")[0] + "2-" + i + ".txt";

      const input = getInput.readAsString(examplefile);

      const marker = findMarker(input, 14);
      console.log(`Input has first marker after character ${marker}`);
    }
  } else {
    const input = getInput.readAsString(filename);

    const marker = findMarker(input, 14);
    console.log(`Input has first marker after character ${marker}`);
  }
};
