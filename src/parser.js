"use strict";

var Parser = require("jison").Parser;
var grammar = require("./grammar.json");

module.exports = new Parser(grammar);
