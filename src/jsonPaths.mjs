import { getType } from "./jsonTypes.mjs";

/**
 * @param {object} obj
 * @param {string} currentPath
 * @returns
 */
export function getJsonPaths(obj, currentPath = "$") {
  const paths = [];

  // jsonPath with js type: <jsonPath>:<type>
  const jsonPathMeta = `${currentPath}:${getType(obj)}`;

  if (typeof obj === "object" && obj !== null) {
    paths.push(jsonPathMeta);

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const newPath = `${currentPath}[${index}]`; // bracket notation for Arrays in jsonPath
        getJsonPaths(item, newPath).forEach(path => paths.push(path));
      });
    } else {
      for (const key in obj) {
        const newPath = `${currentPath}.${key}`; // dot notion in jsonPath
        getJsonPaths(obj[key], newPath).forEach(path => paths.push(path));
      }
    }
  } else {
    paths.push(jsonPathMeta);
  }

  return paths;
}
