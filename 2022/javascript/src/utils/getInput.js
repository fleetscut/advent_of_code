const fs = require("fs");

const readAsString = (filename) => {
  return fs.readFileSync(filename, "utf-8").trim();
};

const readAsArray = (filename) => {
  return fs.readFileSync(filename, "utf-8").trim().split("\n");
};

module.exports = {
  readAsString,
  readAsArray,
};
