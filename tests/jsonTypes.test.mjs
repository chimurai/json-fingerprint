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
      [undefined, 'Unsupported JSON value: undefined'],
      [new Date(), 'Unsupported JSON value: Date'],
      [new Number(123), 'Unsupported JSON value: Number'],
      [BigInt(Number.MAX_SAFE_INTEGER), 'Unsupported JSON value: BigInt'],
      [Buffer.from(''), 'Unsupported JSON value: Buffer'],
      [Object.create(null), 'Unsupported JSON value: object'],
      [/foo/, 'Unsupported JSON value: RegExp'],
      [new RegExp('foo'), 'Unsupported JSON value: RegExp'],
      [new Error('error'), 'Unsupported JSON value: Error'],
      [function () {}, 'Unsupported JSON value: Function'],
      [()=>{}, 'Unsupported JSON value: Function'],
      [async function () {}, 'Unsupported JSON value: AsyncFunction'],
      [function * () {}, 'Unsupported JSON value: GeneratorFunction'],
      [new class MyClass {}, 'Unsupported JSON value: MyClass'],
      [Symbol('str'), 'Unsupported JSON value: Symbol'],
      [new Map(), 'Unsupported JSON value: Map'],
      [new WeakMap(), 'Unsupported JSON value: WeakMap'],
      [new Set(), 'Unsupported JSON value: Set'],
      [new WeakSet(), 'Unsupported JSON value: WeakSet'],
      [new ArrayBuffer(8), 'Unsupported JSON value: ArrayBuffer'],
      [new Int8Array(), 'Unsupported JSON value: Int8Array'],
      [new Uint8Array(), 'Unsupported JSON value: Uint8Array'],
      [new Uint8ClampedArray(), 'Unsupported JSON value: Uint8ClampedArray'],
      [new Int16Array(), 'Unsupported JSON value: Int16Array'],
      [new Uint16Array(), 'Unsupported JSON value: Uint16Array'],
      [new Int32Array(), 'Unsupported JSON value: Int32Array'],
      [new Uint32Array(), 'Unsupported JSON value: Uint32Array'],
      [new Float32Array(), 'Unsupported JSON value: Float32Array'],
      [new Float64Array(), 'Unsupported JSON value: Float64Array'],
    ]);

    for (const [input, errorMessage] of jsonTypes.entries()) {
      assert.throws(() => getType(input), TypeError)
      assert.throws(() => getType(input), { message: errorMessage })
    }
  })

});
