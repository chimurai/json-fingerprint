import * as assert from "node:assert";
import path from 'node:path';
import { describe, it } from "node:test";

import { getFileContent } from "../../src/bin/utils/file.mjs";

describe('bin/utils getFileContent()', () => {
  it("should return content from relative file path", async () => {
    const filePath = './tests/bin-utils/fixtures/mock.json'
    const content = await getFileContent(filePath);
    const expected = {foo: 'bar'};

    assert.equal(filePath.startsWith('/'), false);
    assert.deepEqual(JSON.parse(content), expected);
  });

  it("should return content from absolute file path", async () => {
    const filePath = './tests/bin-utils/fixtures/mock.json'
    const absoluteFilePath = path.join(process.cwd(), filePath);

    const content = await getFileContent(absoluteFilePath);
    const expected = {foo: 'bar'};

    assert.equal(absoluteFilePath.startsWith('/'), true);
    assert.deepEqual(JSON.parse(content), expected);
  });
});
