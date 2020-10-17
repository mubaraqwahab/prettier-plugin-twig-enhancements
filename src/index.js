const { printTextStatement } = require("./TextStatement");
const { printElement } = require("./Element");
const { printBlockStatement } = require("./BlockStatement");

module.exports = {
  melodyExtensions: [],
  printers: {
    PrintTextStatement: printTextStatement,
    Element: printElement,
    BlockStatement: printBlockStatement,
  },
};
