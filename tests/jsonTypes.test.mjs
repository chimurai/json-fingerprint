import { describe, it } from "node:test";
import * as assert from "node:assert";
import { getType } from "../src/jsonTypes.mjs";

describe('getType()', () => {
  it("should return valid JSON value types", () => {
    const jsonTypes = new Map([
      ['null', null],
      ['boolean', true],
      ['boolean', false],
      ['string', ''],
      ['string', 'foo'],
      ['number', 0],
      ['number', 1_000],
      ['array', []],
      ['array', [null, 1, '2']],
      ['object', {}],
    ]);

    for (const [expectedType, input] of jsonTypes.entries()) {
      assert.strictEqual(getType(input), expectedType);
    }
  });

  it('should throw TypeError on not valid JSON value types', () => {
    const jsonTypes = new Map([
      [undefined, 'Invalid JSON value: undefined'],
      [new Date(), 'Invalid JSON value: Date'],
      [new Number(123), 'Invalid JSON value: Number'],
      [BigInt(Number.MAX_SAFE_INTEGER), 'Invalid JSON value: BigInt'],
      [Buffer.from(''), 'Invalid JSON value: Buffer'],
      [Object.create(null), 'Invalid JSON value: object'],
      [/foo/, 'Invalid JSON value: RegExp'],
      [new RegExp('foo'), 'Invalid JSON value: RegExp'],
      [new Error('error'), 'Invalid JSON value: Error'],
      [function () {}, 'Invalid JSON value: Function'],
      [()=>{}, 'Invalid JSON value: Function'],
      [async function () {}, 'Invalid JSON value: AsyncFunction'],
      [function * () {}, 'Invalid JSON value: GeneratorFunction'],
      [new class MyClass {}, 'Invalid JSON value: MyClass'],
      [Symbol('str'), 'Invalid JSON value: Symbol'],
      [new Map(), 'Invalid JSON value: Map'],
      [new WeakMap(), 'Invalid JSON value: WeakMap'],
      [new Set(), 'Invalid JSON value: Set'],
      [new WeakSet(), 'Invalid JSON value: WeakSet'],
      [new ArrayBuffer(8), 'Invalid JSON value: ArrayBuffer'],
      [new Int8Array(), 'Invalid JSON value: Int8Array'],
      [new Uint8Array(), 'Invalid JSON value: Uint8Array'],
      [new Uint8ClampedArray(), 'Invalid JSON value: Uint8ClampedArray'],
      [new Int16Array(), 'Invalid JSON value: Int16Array'],
      [new Uint16Array(), 'Invalid JSON value: Uint16Array'],
      [new Int32Array(), 'Invalid JSON value: Int32Array'],
      [new Uint32Array(), 'Invalid JSON value: Uint32Array'],
      [new Float32Array(), 'Invalid JSON value: Float32Array'],
      [new Float64Array(), 'Invalid JSON value: Float64Array'],
    ]);

    for (const [input, errorMessage] of jsonTypes.entries()) {
      assert.throws(() => getType(input), TypeError)
      assert.throws(() => getType(input), { message: errorMessage })
    }
  })

});
