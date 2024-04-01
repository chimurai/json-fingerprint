import { getJsonPaths } from "./jsonPaths.mjs";

export function hashJson(object) {
  const jsonPaths = getJsonPaths(object);
  console.log(jsonPaths);
}
