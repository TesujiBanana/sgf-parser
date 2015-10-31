"use strict";

import parser from "../src/parser";
import { inspect } from "util";

let simpleSGF = require("../sgf/simple.sgf");
let variationSGF = require("../sgf/variation.sgf");

describe('parser', () => {
  describe('parse', () => {
    it('parses a simple SGF', () => {
      expect(() => parser.parse(simpleSGF)).to.not.throw();
    });

    it('returns the root node', () => {
      let root = parser.parse(simpleSGF);
      expect(root.FF).to.equal(4);
      expect(root.GM).to.equal(1);
      expect(root.SZ).to.equal(19);
      expect(root._next).to.be.an('object');
    });

    it('root node has pointer to next', () => {
      let root = parser.parse(simpleSGF);
      let child = root._next;
      expect(child.B).to.equal("aa");
    });

    it('child node has pointer to parent', () => {
      let root = parser.parse(simpleSGF);
      let child = root._next;
      expect(child._parent).to.eql(root);
    });

    it('parses an SGF with branches', () => {
      expect(() => parser.parse(variationSGF)).to.not.throw();
    });

    it('has a pointer to the main branch', () => {
      let root = parser.parse(variationSGF);
      let mainline = root._next._next._next;
      expect(mainline.B).to.equal("cc");
      expect(mainline.N).to.equal("Var A");
    });

    it('main branch has a pointer to parent', () => {
      let root = parser.parse(variationSGF);
      let main = root._next._next;
      let main_branch = main._next;
      expect(main_branch._parent).to.eql(main);
    });

    it('has a pointer to variations', () => {
      let root = parser.parse(variationSGF);
      let variations = root._next._next._variations;
      expect(variations[0].B).to.equal("hh");
      expect(variations[0].N).to.equal("Var B");
      expect(variations[1].B).to.equal("gg");
      expect(variations[1].N).to.equal("Var C");
    });

    it('variations have pointers to parent', () => {
      let root = parser.parse(variationSGF);
      let main = root._next._next;
      let variations = main._variations;
      expect(variations[0]._parent).to.eql(main);
      expect(variations[1]._parent).to.eql(main);
    })
  });
});
