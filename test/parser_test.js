"use strict";

import parser from "../src/parser";
import { inspect } from "util";

let simpleSGF = require("../sgf/simple.sgf");
let variationSGF = require("../sgf/variation.sgf");

describe('parser', () => {
  describe('parse', () => {
    it('parses without errors', () => {
      expect(() => parser.parse(simpleSGF)).to.not.throw();
    });

    it('parses a simple SGF', () => {
      let parsed = [
        {FF: 4, GM: 1, SZ: 19},
        {B: "aa"},
        {W: "bb"},
        {B: "cc"},
        {W: "dd"},
        {B: "ad"},
        {W: "bd"}
      ];
      expect(parser.parse(simpleSGF)).to.eql(parsed);
    });

    it('parses an SGF with branches', () => {
      // let parsed = [
        // {FF: 4, GM: 1, SZ: 19},
        // {B: "aa"},
        // {W: "bb"},
        // [
        //   {B: "cc", N: "Var A"}
        // ]
        // {B: "cc"},
        // {W: "dd"},
        // {B: "ad"},
        // {W: "bd"}
        //
        // (;FF[4]GM[1]SZ[19];B[aa];W[bb](;B[cc]N[Var A];W[dd];B[ad];W[bd])
        // (;B[hh]N[Var B];W[hg])
        // (;B[gg]N[Var C];W[gh];B[hh];W[hg];B[kk]))
      // ]
      expect(() => {
        var result = parser.parse(variationSGF);
        console.log(inspect(result, {depth: null}));
      }).to.not.throw();
    });
  });
});
