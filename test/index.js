const fs = require("fs");
const prettier = require("prettier");

const code = fs.readFileSync("test/index.njk").toString();

const formatted = prettier.format(code, {
  parser: "melody",
  plugins: ["."],
  twigMelodyPlugins: ["./src/index.js"],
});

console.log(formatted);
