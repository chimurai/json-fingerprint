import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Return file content
 * @param {string} file
 */
export async function getFileContent(file) {
  // handle absolute and relative paths
  const filePath = file.startsWith('/') ? file : path.join(process.cwd(), file);
  const content = await readFile(filePath, {encoding: 'utf-8'});

  return content;
}

