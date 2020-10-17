// Ideally, you should set up some test suites with Jest or something.

const fs = require("fs");
const prettier = require("prettier");

const code = fs.readFileSync("test/index.njk").toString();

const formatted = prettier.format(code, {
  parser: "melody",
  plugins: ["."],
  twigMelodyPlugins: ["./src/index.js"],
  twigFollowOfficialCodingStandards: false,
});

console.log(formatted);
