/**
 * return data from Stream (process.stdin)
 * @param {Readable} stdin
 * @returns {Promise<string>}
 */
export async function getStreamContent(stdin) {
  const content = await new Promise((resolve, reject) => {
    let input = '';
    stdin.on('data', (chunk) => input += chunk);
    stdin.on('end', () => resolve(input));
    stdin.on('error', reject);
  });

  return content;
}
