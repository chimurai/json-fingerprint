import { sha256 } from "./crypto.mjs";
import { getJsonPaths } from "./jsonPaths.mjs";

export function hashJson(input, hashFn = sha256) {
  let object = input;

  if (typeof input === 'string') {
    object = JSON.parse(input)
  }

  const jsonPaths = getJsonPaths(object);
  const jsonString = JSON.stringify(jsonPaths);
  const hash = hashFn(jsonString);

  const result = {
    hash,
    jsonPaths,
    source: input,
  }
  return result;
}

