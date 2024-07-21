import { createHash } from 'node:crypto';

export function sha256(data) {
  return cryptoHash(data, 'sha256');
}

/**
 * https://nodejs.org/api/crypto.html#cryptocreatehashalgorithm-options
 * `openssl list -digest-algorithms` to display the available digest algorithms
 */
export function cryptoHash(data, algorithm = 'sha256') {
  return createHash(algorithm).update(data).digest('hex');
}
