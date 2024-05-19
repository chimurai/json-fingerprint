import { describe, it } from "node:test";
import * as assert from "node:assert";
import { getJsonPaths } from "../src/jsonPaths.mjs";

describe('getJsonPaths()', () => {
  it("should handle empty object", () => {
    const input = {};
    const hash = getJsonPaths(input);
    const expected = ["$:object"];
    assert.deepEqual(hash, expected);
  });

  it("should handle empty array", () => {
    const input = [];
    const hash = getJsonPaths(input);
    const expected = ["$:array"];
    assert.deepEqual(hash, expected);
  });

  it("should handle complex object with different data types", () => {
    const input = {
      a: {
        b: [
          { c: 1, d: 2 },
          { e: "3", f: "4" },
        ],
      },
      g: "hello",
      h: true,
      i: null,
    };

    const hash = getJsonPaths(input);
    const expected = [
      "$:object",
      "$.a:object",
      "$.a.b:array",
      "$.a.b[0]:object",
      "$.a.b[0].c:number",
      "$.a.b[0].d:number",
      "$.a.b[1]:object",
      "$.a.b[1].e:string",
      "$.a.b[1].f:string",
      "$.g:string",
      "$.h:boolean",
      "$.i:null",
    ];
    assert.deepEqual(hash, expected);
  });

  it('should throw when unsupported JSON value "undefined" is provided', () => {
    const fn = () => {
      const input = undefined;
      getJsonPaths(input);
    }

    const expectedError = {
      message: 'Unsupported JSON value: undefined'
    }

    assert.throws(fn, expectedError)
  });

  it('should throw when unsupported JSON value "function" is provided', () => {
    const fn = () => {
      const input = () => {};
      getJsonPaths(input);
    }

    const expectedError = {
      message: 'Unsupported JSON value: Function'
    }

    assert.throws(fn, TypeError)
    assert.throws(fn, expectedError)
  });
});
