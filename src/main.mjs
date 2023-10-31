import { getJsonPaths } from "./getJsonPaths.mjs";

export function getJsonMetaHash(object) {
  const jsonPaths = getJsonPaths(object);
  console.log(jsonPaths.sort());
}
