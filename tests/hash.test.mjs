import { describe, it } from "node:test";
import * as assert from "node:assert";
import { hashJson } from "../src/main.mjs";

describe('hash sha256', () => {
  it("should return a result object", () => {
    const input = {};
    const result = hashJson(input);
    const expected =  {
      hash: '7b91a4b0e91c6ca5514fd6a93ca1a16e985475f0d93b5104f1f9bab111c30b43',
      jsonPaths: [
        '$:object'
      ],
      source: {}
    };
    assert.deepEqual(result, expected);
  });


  it("should calculate sha256 form empty object {}", () => {
    const input = {};
    const result = hashJson(input);
    const expected = {
      hash: '7b91a4b0e91c6ca5514fd6a93ca1a16e985475f0d93b5104f1f9bab111c30b43',
      jsonPaths: [
        '$:object'
      ],
      source: {}
    }
    assert.deepEqual(result, expected);
  });

  it("should calculate sha256 form empty array []", () => {
    const input = [];
    const result = hashJson(input);
    const expected = {
      hash: 'bc6443f2e3bdc0ad6b5a09effe036b605295456a5c89133a7239c5c61684ab15',
      jsonPaths: [
        '$:array'
      ],
      source: []
    };
    assert.deepEqual(result, expected);
  });

  it("should calculate sha256 for number type", () => {
    const input = [1];
    const result = hashJson(input);
    const expected = {
      hash: '79a0177459f1b8a48eb2b8989d0cb5d552c83ffc507361a15195b61e855c9058',
      jsonPaths: [
        '$:array',
        '$[0]:number'
      ],
      source: [
        1
      ]
    };
    assert.deepEqual(result, expected);
  });

  it("should calculate sha256 for string type", () => {
    const input = ["1"];
    const result = hashJson(input);
    const expected = {
      hash: 'e678ec848568753d3aa6e39641e55bf525431f20fcc24c7bd6ab3cf6ffd3a378',
      jsonPaths: [
        '$:array',
        '$[0]:string'
      ],
      source: [
        '1'
      ]
    };
    assert.deepEqual(result, expected);
  });

  it("should calculate sha256 for boolean type", () => {
    const input = [true];
    const result = hashJson(input);
    const expected = {
      hash: '1812b2a5f26bbf3e65a80ad730e8aaddfe697c97d36c245db684e37b480cabec',
      jsonPaths: [
        '$:array',
        '$[0]:boolean'
      ],
      source: [
        true
      ]
    };
    assert.deepEqual(result, expected);
  });

  it("should calculate sha256 for null type", () => {
    const input = [null];
    const result = hashJson(input);
    const expected = {
      hash: '6186699f2e4d35cebc36e0588b821fbbb97f9b6ac2ad66586f893d3d64876c02',
      jsonPaths: [
        '$:array',
        '$[0]:null'
      ],
      source: [
        null
      ]
    };
    assert.deepEqual(result, expected);
  });

  it("should calculate sha256 for manually parsed JSON", () => {
    const input = JSON.parse(`{"foo":"bar"}`);
    const result = hashJson(input);
    const expected = {
      hash: '3e61d854042bcd6273a8e18589eb53a37e4cdc111bd2dc717413951637c11e2d',
      jsonPaths: [
        '$:object',
        '$.foo:string'
      ],
      source: {
        foo: 'bar'
      }
    };
    assert.deepEqual(result, expected);
  });

  it("should calculate sha256 for automatic parsed JSON", () => {
    const input = `{"foo":"bar"}`;
    const result = hashJson(input);
    const expected = {
      hash: '3e61d854042bcd6273a8e18589eb53a37e4cdc111bd2dc717413951637c11e2d',
      jsonPaths: [
        '$:object',
        '$.foo:string'
      ],
      source: `{"foo":"bar"}`
    };
    assert.deepEqual(result, expected);
  });

  it("should throw error when invalid JSON string is provided as input", () => {
    const input = `invalid JSON string`;

    assert.throws(() => hashJson(input), 'SyntaxError: Unexpected end of JSON input')
  });
})
