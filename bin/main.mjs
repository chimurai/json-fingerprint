import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { fingerprintJSON } from '../src/main.mjs';

const [,, ...args] = process.argv

/**
 * Convert args Array to Map
 * @argument --file=my.json
 * @argument --hash=sha256
 *
 * @returns {"file":"my.json", "hash":"sha256"}
 */
const config = Object.fromEntries(args.map(item => item.replace(/^-+/g, '').split('=')));


if (!process.stdin.isTTY) {
  // handle piped data
  const content = await new Promise((resolve, reject) => {
    let input = '';
    process.stdin.on('data', (chunk) => input += chunk);
    process.stdin.on('end', () => resolve(input));
    process.stdin.on('error', reject);
  });

  console.log(fingerprintJSON(content).hash)
} else {
  // handle --file configuration
  const { file } = config;
  assert(!!file, new Error('--file must be defined (example: "--file=package.json")'));

  // handle absolute and relative paths
  const filePath = (file.startsWith('/')) ? file : path.join(process.cwd(), file);

  const content = await readFile(filePath, {encoding: 'utf-8'});
  console.log(fingerprintJSON(content).hash);
}


