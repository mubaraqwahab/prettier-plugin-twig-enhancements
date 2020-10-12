const {
  doc: {
    builders: { concat, hardline },
  },
  format,
} = require("prettier");

const {
  printTextStatement,
} = require("prettier-plugin-twig-melody/src/print/TextStatement");

// Twig doesn't support frontmatter, so use only deal with it in the printer!

function printTextStatementWithFrontMatter(node, path, print, options) {
  /**
   * @type {StringLiteral}
   * See https://github.com/trivago/melody/blob/a9a09f85c06d16d39dd621bcb4ffd07d9d5e307d/packages/melody-types/src/index.js#L130-L155
   */
  const literal = node.value;

  // Credit to Prettier for the regex!
  // https://github.com/prettier/prettier/blob/a2ca7e95d30851581987507c16a7ead9c4e3706f/src/utils/front-matter.js#L19
  const frontMatterRegex = /^(---)([^\n]*)\n(?:([\s\S]*?)\n)?(\1)([^\n\S])*(\n|$)/;
  let matches;

  if (
    node.loc.start.index !== 0 ||
    (matches = literal.value.match(frontMatterRegex)) === null
  ) {
    // Don't use the Prettier idiom path.call(print, "value")
    // so you can fallback to the default printing of the node itself.
    // (Perhaps there's already an idiom for this as well?)
    return printTextStatement(node, path, print, options);
  }

  // The current node's value, excluding the frontmatter
  // (Note that the first item in `matches` is the entire matching string)
  const rest = literal.value.slice(matches[0].length);

  literal.value = rest;

  // The third capture group contains the YAML content.
  let rawYAML = matches[3];
  // There's probably a better way to call `format` from within a printer
  let prettyYAML = rawYAML ? format(rawYAML, { parser: "yaml" }) : "";

  return concat([
    "---",
    hardline,
    prettyYAML,
    "---",
    hardline,
    // Print the rest of the node.
    printTextStatement(node, path, print, options),
  ]);
}

module.exports = {
  melodyExtensions: [],
  printers: {
    PrintTextStatement: printTextStatementWithFrontMatter,
  },
};
