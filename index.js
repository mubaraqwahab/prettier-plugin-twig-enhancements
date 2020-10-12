const {
  doc: {
    builders: { concat, hardline },
  },
} = require("prettier");
const { parseFrontMatter } = require("./parse");

/*
 * YAML frontmatter must follow this format:
 *
 *    ---
 *    var1: ...
 *    var2: ...
 *    ---
 *
 * The first line must have three hyphens and a newline
 * The last line must have three hyphens as well. You can add a newline to make things Prettier
 * Between the delimiters in regular YAML syntax
 */

function printFrontMatter(node, path, print, options) {
  // Tell prettier to print using YAML printer

  let yamlDoc;

  return concat([
    "---",
    hardline,
    yamlDoc,
    hardline,
    "---",
    hardline,
    hardline,
  ]);
}

module.exports = {
  melodyExtensions: [
    {
      name: "frontmatter",
      parse: parseFrontMatter,
    },
  ],
  printers: {
    FrontMatter: printFrontMatter,
  },
};
