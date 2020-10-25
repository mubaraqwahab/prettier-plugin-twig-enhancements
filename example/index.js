const fs = require("fs");
const prettier = require("prettier");

const code = fs.readFileSync("example/index.njk").toString();

// Pass any command line param to enable the enhancement plugin
// e.g. node example/index.js p
const withPlugin = !!process.argv[2];

const formatted = prettier.format(code, {
  parser: "melody",
  plugins: ["."],
  ...(withPlugin ? { twigMelodyPlugins: ["."] } : {}),
  twigFollowOfficialCodingStandards: false,
});

console.log(formatted);
