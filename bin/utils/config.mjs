/**
 * Convert args Array to POJO Map
 * @param {string[]} args
 *
 * @returns {Record<string, string>}
 */

export function parseConfig(args = []) {
  return Object.fromEntries(args.map(item => item.replace(/^-+/g, '').split('=')));
}
