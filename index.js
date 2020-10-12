// const { parsers } = require("prettier/parser-yaml");
const {
  doc: {
    builders: { concat, hardline },
  },
} = require("prettier");

// Twig doesn't support frontmatter, so use only deal with it in the printer!

/*
 * I didn't find any specification (or the like) for YAML frontmatter
 * so I'm making the following assumptions based on what I observed
 * Eleventy (https://www.11ty.dev/) and Nunjucks (https://mozilla.github.io/nunjucks/)
 * consider as "valid" YAML frontmatter.
 *
 * "Valid" YAML frontmatter should look something like:
 *     ---
 *     hello: world
 *     ---
 *
 * The restrictions are as follows:
 * - It must begin a file (i.e. nothing, not even whitespace, should come before it).
 * - The first line must contain only the delimiter (---) and a newline.
 *   (Optionally, there may be whitespace between the two).
 * - The same restriction that on the first line applies to the last,
 *   except that the newline at the end is not mandatory.
 * - Between the first and last line must be valid YAML syntax.
 * - If the YAML content of the frontmatter is empty,
 *   then the closing delimeter may immediately follow the opening one
 *   provided there is no non-newline whitesphace after the opening one.
 *   In other words, this is "valid" frontmatter:
 *     ------
 *   and so is:
 *     ---
 *     ---
 *   but this is not:
 *     --- ---
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
