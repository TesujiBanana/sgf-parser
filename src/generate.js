"use strict";

var parser = require("./parser");
var fs = require("fs");

var location = "lib/parser.js";
var contents = parser.generate();

fs.writeFileSync(location, contents);
