const { printElement } = require("./Element");
const { printBlockStatement } = require("./BlockStatement");

module.exports = {
  melodyExtensions: [],
  printers: {
    Element: printElement,
    BlockStatement: printBlockStatement,
  },
};
