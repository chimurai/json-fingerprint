import * as assert from "node:assert";
import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { describe, it } from "node:test";

import { getStreamContent } from '../../bin/utils/stream.mjs';

describe('bin/utils getStreamContent()', () => {
  it("should return content from process.stdin", async () => {
    const input = `{"foo":"bar"}\n`;

    const mockStdin = new Readable({
      read() {
        this.push(input);
        this.push(null);
      }
    });

    const content = await getStreamContent(mockStdin);
    const expected = {foo: 'bar'};

    assert.deepEqual(JSON.parse(content), expected);
  });

  it('should read content from fs:createReadStream', async () => {
    const filePath = './tests/bin-utils/fixtures/mock.json';
    const readStream = createReadStream(filePath);
    const content = await getStreamContent(readStream);
    const expected = {foo: 'bar'};

    assert.deepEqual(JSON.parse(content), expected);
  })
});
