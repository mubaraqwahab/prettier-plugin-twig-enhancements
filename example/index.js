const fs = require("fs");
const prettier = require("prettier");

const code = fs.readFileSync("example/index.njk").toString();

const withPlugin = !!process.argv[2];

const formatted = prettier.format(code, {
  parser: "melody",
  plugins: ["."],
  ...(withPlugin ? { twigMelodyPlugins: ["."] } : {}),
  twigFollowOfficialCodingStandards: false,
});

console.log(formatted);
