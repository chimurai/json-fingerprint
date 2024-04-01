import { describe, it } from "node:test";
import * as assert from "node:assert";
import { hashJson } from "../src/main.mjs";

describe('hash sha256', () => {
  it("should calculate sha256 form empty {}", () => {
    const input = {};
    const hash = hashJson(input);
    const expected = '7b91a4b0e91c6ca5514fd6a93ca1a16e985475f0d93b5104f1f9bab111c30b43';
    assert.strictEqual(hash, expected);
  });

  it("should calculate sha256 form empty []", () => {
    const input = [];
    const hash = hashJson(input);
    const expected = 'bc6443f2e3bdc0ad6b5a09effe036b605295456a5c89133a7239c5c61684ab15';
    assert.strictEqual(hash, expected);
  });
})
