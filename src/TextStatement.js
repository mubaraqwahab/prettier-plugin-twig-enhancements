const prettier = require("prettier");
const { concat, softline, join, hardline } = prettier.doc.builders;
const {
  isWhitespaceOnly,
  countNewlines,
  createTextGroups,
  PRESERVE_LEADING_WHITESPACE,
  PRESERVE_TRAILING_WHITESPACE,
  NEWLINES_ONLY,
} = require("prettier-plugin-twig-melody/src/util");

const newlinesOnly = (s, preserveWhitespace = true) => {
  const numNewlines = countNewlines(s);
  if (numNewlines === 0) {
    return preserveWhitespace ? softline : "";
  } else if (numNewlines === 1) {
    return hardline;
  }
  return concat([hardline, hardline]);
};

const p = (node, path, print) => {
  // Check for special values that might have been
  // computed during preprocessing
  const preserveLeadingWhitespace = node[PRESERVE_LEADING_WHITESPACE] === true;
  const preserveTrailingWhitespace =
    node[PRESERVE_TRAILING_WHITESPACE] === true;

  const rawString = path.call(print, "value");
  if (isWhitespaceOnly(rawString) && node[NEWLINES_ONLY]) {
    return newlinesOnly(rawString);
  }

  const textGroups = createTextGroups(
    rawString,
    preserveLeadingWhitespace,
    preserveTrailingWhitespace
  );

  return join(concat([hardline, hardline]), textGroups);
};

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
    return p(node, path, print, options);
  }

  // Remove the frontmatter from the current node's value
  const rest = literal.value.slice(matches[0].length);
  literal.value = rest.replace(/^\n+/, "\n");

  // The third capture group contains the YAML content.
  let rawYAML = matches[3];
  let prettyYAML = rawYAML ? prettier.format(rawYAML, { parser: "yaml" }) : "";

  return concat([
    "---",
    hardline,
    prettyYAML,
    "---",
    hardline,
    rest.startsWith("\n") ? "" : hardline,
    // Print the rest of the node.
    p(node, path, print, options),
  ]);
}

module.exports = {
  printTextStatement: printTextStatementWithFrontMatter,
};
