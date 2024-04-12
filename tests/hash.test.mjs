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
    const {hash} = hashJson(input);
    const expected = '7b91a4b0e91c6ca5514fd6a93ca1a16e985475f0d93b5104f1f9bab111c30b43';
    assert.strictEqual(hash, expected);
  });

  it("should calculate sha256 form empty array []", () => {
    const input = [];
    const {hash} = hashJson(input);
    const expected = 'bc6443f2e3bdc0ad6b5a09effe036b605295456a5c89133a7239c5c61684ab15';
    assert.strictEqual(hash, expected);
  });

  it("should calculate sha256 for number type", () => {
    const input = 1;
    const {hash} = hashJson(input);
    const expected = 'a9d3a07da17475f97bccd0f2d751b48ba3f02f6f80784886185bbc95e920e35b';
    assert.strictEqual(hash, expected);
  });

  it("should calculate sha256 for string type", () => {
    const input = "1";
    const {hash} = hashJson(input);
    const expected = 'e82fe1e004fd9f16a2a9c6baeb3a70a16c1909a026be42db309013d1d15c0fca';
    assert.strictEqual(hash, expected);
  });

  it("should calculate sha256 for boolean type", () => {
    const input = true;
    const {hash} = hashJson(input);
    const expected = '4f1d702b16c654b2ac41bdcc7ab607f69717dbf9853e0b710a0993515b7cba99';
    assert.strictEqual(hash, expected);
  });

  it("should calculate sha256 for null type", () => {
    const input = null;
    const {hash} = hashJson(input);
    const expected = '6122bc4f3f0752848330718670eda35c4bce5e17a71bbb046579b4762bc6af26';
    assert.strictEqual(hash, expected);
  });

  it("should calculate sha256 for parsed JSON", () => {
    const input = JSON.parse(`{"foo":"bar"}`);
    const {hash} = hashJson(input);
    const expected = '3e61d854042bcd6273a8e18589eb53a37e4cdc111bd2dc717413951637c11e2d';
    assert.strictEqual(hash, expected);
  });
})
