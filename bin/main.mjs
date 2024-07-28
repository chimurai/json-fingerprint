import assert from 'node:assert';

import { cryptoHash } from '../src/crypto.mjs'
import { fingerprintJSON } from '../src/main.mjs';
import { getFileContent } from './utils/file.mjs'
import { getStreamContent } from './utils/stream.mjs';
import { parseConfig } from './utils/config.mjs';

const [,, ...args] = process.argv

const config = parseConfig(args);

const EXITCODE = /** @type {const} */ ({
  SUCCESS: 0,
  ERROR: 1
});

/**
 * Handle `--hash` config
 * Create hash function with configured hash algorithm
 */
const hashFn = (config.hash) ? (data) => cryptoHash(data, config.hash) : undefined;

if ('version' in config) {
  const {default: pkg } = await import('../package.json', {
    assert: {
      type: "json",
    },
  })
  console.log(pkg.version);

  process.exit(EXITCODE.SUCCESS);
}

if (!process.stdin.isTTY) {
  // get data from process.stdin
  const content = await getStreamContent(process.stdin);

  console.log(fingerprintJSON(content, hashFn).hash);

  process.exit(EXITCODE.SUCCESS);
}

if ('file' in config) {
  // handle --file configuration
  const { file } = config;
  assert(!!file, new Error('--file must be defined (example: "--file=package.json")'));

  const content = await getFileContent(file);
  console.log(fingerprintJSON(content, hashFn).hash);

  process.exit(EXITCODE.SUCCESS);
}

console.log(`Use '--help' for usage information`);
process.exit(EXITCODE.ERROR);
