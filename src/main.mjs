import { sha256 } from "./crypto.mjs";
import { getJsonPaths } from "./jsonPaths.mjs";

export function hashJson(object, hashFn = sha256) {
  const jsonPaths = getJsonPaths(object);
  const jsonString = JSON.stringify(jsonPaths);
  const hash = hashFn(jsonString);

  return hash;
}

