"use strict";

import { Parser } from "jison";
import grammar from "./grammar.json";

export default new Parser(grammar);
