const fs = require("fs");
const prettier = require("prettier");

const code = fs.readFileSync("example/index.njk").toString();

const formatted = prettier.format(code, {
  parser: "melody",
  plugins: ["."],
  // twigMelodyPlugins: ["."],
  twigFollowOfficialCodingStandards: false,
});

console.log(formatted);
