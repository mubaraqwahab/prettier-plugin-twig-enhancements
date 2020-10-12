const { Node, type, visitor } = require("melody-types");
const { parsers } = require("prettier/parser-yaml");
const {
  doc: {
    builders: { concat, hardline },
  },
} = require("prettier");

class FrontMatter extends Node {
  /**
   * @param {string} yaml
   */
  constructor(yaml) {
    super();
    this.value = yaml;
  }
}

type(FrontMatter, "FrontMatter");
visitor(FrontMatter, "value");

// Discard the delimiters.
// If possible, parse YAML with its own parser
function parseFrontMatter(parser, token) {}

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
