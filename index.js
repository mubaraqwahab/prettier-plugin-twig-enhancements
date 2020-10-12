const {
  doc: {
    builders: { concat, hardline },
  },
  format,
} = require("prettier");

const {
  printTextStatement,
} = require("prettier-plugin-twig-melody/src/print/TextStatement");

function printTextStatementWithFrontMatter(node, path, print, options) {
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

  // Remove the frontmatter from the current node's value
  const rest = literal.value.slice(matches[0].length);
  literal.value = rest.replace(/^\n+/, "\n");

  // The third capture group contains the YAML content.
  let rawYAML = matches[3];
  let prettyYAML = rawYAML ? format(rawYAML, { parser: "yaml" }) : "";

  return concat([
    "---",
    hardline,
    prettyYAML,
    "---",
    hardline,
    rest.startsWith("\n") ? "" : hardline,
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
