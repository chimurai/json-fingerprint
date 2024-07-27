import * as assert from "node:assert";
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { describe, it } from "node:test";
import { getFileContent, getStreamContent, parseConfig } from "../bin/utils.mjs";

describe('bin/utils', () => {
  describe('parseConfig()', () => {
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

  describe('getStreamContent()', () => {
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
      const filePath = './tests//fixtures/mock.json';
      const readStream = createReadStream(filePath);
      const content = await getStreamContent(readStream);
      const expected = {foo: 'bar'};

      assert.deepEqual(JSON.parse(content), expected);
    })
  });

  describe('getFileContent()', () => {
    it("should return content from relative file path", async () => {
      const filePath = './tests//fixtures/mock.json'
      const content = await getFileContent(filePath);
      const expected = {foo: 'bar'};

      assert.equal(filePath.startsWith('/'), false);
      assert.deepEqual(JSON.parse(content), expected);
    });

    it("should return content from absolute file path", async () => {
      const filePath = './tests//fixtures/mock.json'
      const absoluteFilePath = path.join(process.cwd(), filePath);

      const content = await getFileContent(absoluteFilePath);
      const expected = {foo: 'bar'};

      assert.equal(absoluteFilePath.startsWith('/'), true);
      assert.deepEqual(JSON.parse(content), expected);
    });
  });
})
