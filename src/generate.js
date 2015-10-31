"use strict";

import parser from "./parser";
import { writeFileSync } from "fs";

let location = "lib/parser.js";
let contents = parser.generate();

writeFileSync(location, contents);
