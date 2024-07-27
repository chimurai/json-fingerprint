import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Convert args Array to POJO Map
 * @argument --file=my.json
 * @argument --hash=sha256
 *
 * @returns {"file":"my.json", "hash":"sha256"}
 */
export function parseConfig(args = []) {
  return Object.fromEntries(args.map(item => item.replace(/^-+/g, '').split('=')));
}

/** return piped data from process.stdin */
export async function getStreamContent(stdin) {
  const content = await new Promise((resolve, reject) => {
    let input = '';
    stdin.on('data', (chunk) => input += chunk);
    stdin.on('end', () => resolve(input));
    stdin.on('error', reject);
  });

  return content;
}

/** return file content */
export async function getFileContent(file) {
  // handle absolute and relative paths
  const filePath = file.startsWith('/') ? file : path.join(process.cwd(), file);
  const content = await readFile(filePath, {encoding: 'utf-8'});

  return content;
}

