"use strict";

var parser = require("../src/parser");

var _ = require("underscore");

var simpleSGF = require("../sgf/simple.sgf");
var variationSGF = require("../sgf/variation.sgf");
var problemSGF = require("../sgf/problem.sgf");
var commentSGF = require("../sgf/comment.sgf");

describe('parser', () => {
  describe('parse', () => {
    it('parses a simple SGF', () => {
      expect(() => parser.parse(simpleSGF)).to.not.throw();
    });

    it('returns a list of nodes', () => {
      var nodes = parser.parse(simpleSGF);
      expect(nodes).to.be.instanceof(Array);
    });

    it('root node is first', () => {
      var root = parser.parse(simpleSGF)[0];
      expect(root.FF).to.equal(4);
      expect(root.GM).to.equal(1);
      expect(root.SZ).to.equal(19);
      expect(root._next).to.be.an('object');
    });

    it('last node is last', () => {
      var nodes = parser.parse(simpleSGF);
      var last = nodes[nodes.length - 1];
      expect(last.W).to.equal('bd');
    });

    it('root node has pointer to next', () => {
      var root = parser.parse(simpleSGF)[0];
      var child = root._next;
      expect(child.B).to.equal("aa");
    });

    it('child node has pointer to parent', () => {
      var root = parser.parse(simpleSGF)[0];
      var child = root._next;
      expect(child._parent).to.eql(root);
    });

    it('parses an SGF with branches', () => {
      expect(() => parser.parse(variationSGF)).to.not.throw();
    });

    it('has a pointer to variations', () => {
      var root = parser.parse(variationSGF)[0];
      var variations = root._next._next._next;
      expect(variations[0].B).to.equal("cc");
      expect(variations[0].N).to.equal("Var A");
      expect(variations[1].B).to.equal("hh");
      expect(variations[1].N).to.equal("Var B");
      expect(variations[2].B).to.equal("gg");
      expect(variations[2].N).to.equal("Var C");
    });

    it('variations have pointers to parent', () => {
      var root = parser.parse(variationSGF)[0];
      var main = root._next._next;
      var variations = main._next;
      expect(variations[0]._parent).to.eql(main);
      expect(variations[1]._parent).to.eql(main);
      expect(variations[2]._parent).to.eql(main);
    });

    it('nodes can have no (zero) properties', () => {
      var root = parser.parse(problemSGF)[0];
      var emptyNode = _.omit(root._next, "_parent", "_next", "_variations");
      expect(emptyNode).to.eql({});
    });

    it('properties can have multiple values', () => {
      var root = parser.parse(problemSGF)[0];
      expect(root.AB).to.eql(["ob", "nc", "pc", "qc", "qe", "re"]);
      expect(root.AW).to.eql(["pb", "qb", "rb", "rc", "rd"]);
    });

    it('comments can be multiples lines', () => {
      var root = parser.parse(commentSGF)[0];
      expect(root.C).to.match(/multi-/);
      expect(root.C).to.match(/line/);
      expect(root.C).to.match(/comment!!!/);
    });
  });
});
