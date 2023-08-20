const fs = require("fs");

function readAsString(filename) {
  return fs.readFileSync(filename, "utf-8").trim();
}

module.exports = {
  readAsString,
};
