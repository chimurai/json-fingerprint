import * as crypto from 'node:crypto';

export function sha256(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}
