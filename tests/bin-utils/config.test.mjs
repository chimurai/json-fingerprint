import * as assert from "node:assert";
import { describe, it } from "node:test";

import { parseConfig } from '../../src/bin/utils/config.mjs';

describe('bin/utils parseConfig()', () => {
  it('should parse CLI options to a POJO', () => {
    assert.deepEqual(parseConfig(undefined), {});
    assert.deepEqual(parseConfig([]), {});
    assert.deepEqual(parseConfig(['--file=my.json']), {file: 'my.json'});
    assert.deepEqual(parseConfig(['--file=train-case.json']), {file: 'train-case.json'});
    assert.deepEqual(parseConfig(['--hash=sha256']), {hash: 'sha256'});
    assert.deepEqual(parseConfig(['--hash=SHA3-256']), {hash: 'SHA3-256'});
    assert.deepEqual(parseConfig(['--file=my.json', '--hash=sha256']), {file: 'my.json', hash: 'sha256'});
  });
});
