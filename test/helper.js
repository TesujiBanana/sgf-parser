"use strict";

var fs = require('fs');
require.extensions['.sgf'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

global.expect = require("chai").expect;
