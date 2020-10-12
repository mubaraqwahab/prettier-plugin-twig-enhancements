const { Node, type, visitor } = require("melody-types");
// const { parsers } = require("prettier/parser-yaml");
const { Parser: MelodyParser } = require("melody-parser");
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

const FrontMatterParser = {
  name: "frontmatter",
  /**
   *
   * @param {MelodyParser} parser
   * @param {*} token
   */
  parse: function parseFrontMatter(parser, token) {
    console.log(parser.tokens);
    // Discard the delimiters.
    // If possible, parse YAML with its own parser
    console.log(JSON.stringify(token), "\n");
  },
};

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
      tags: [FrontMatterParser],
    },
  ],
  printers: {
    FrontMatter: printFrontMatter,
  },
};
