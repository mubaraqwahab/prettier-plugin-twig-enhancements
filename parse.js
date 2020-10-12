const { parsers } = require("prettier/parser-yaml");

// Discard the delimiters.
// If possible, parse YAML with its own parser
function parseFrontMatter(parser, token) {}

module.exports = {
  parseFrontMatter,
};
