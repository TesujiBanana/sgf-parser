"use strict";

import { readFileSync } from "fs";
var fs = require('fs');
require.extensions['.sgf'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

import { expect } from "chai";
global.expect = expect;
