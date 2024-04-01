import { getType } from "./jsonTypes.mjs";

/**
 * @param {object} obj
 * @param {object} currentPath
 * @returns
 */
export function getJsonPaths(obj, currentPath = "$") {
  let paths = [];

  // jsonPath with js type: <jsonPath>:<type>
  const jsonPathMeta = `${currentPath}:${getType(obj)}`;

  if (typeof obj === "object" && obj !== null) {
    paths.push(jsonPathMeta);

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        let newPath = `${currentPath}[${index}]`; // bracket notation for Arrays in jsonPath
        paths = [...paths, ...getJsonPaths(item, newPath)];
      });
    } else {
      for (let key in obj) {
        let newPath = `${currentPath}.${key}`; // dot notion in jsonPath
        paths = [...paths, ...getJsonPaths(obj[key], newPath)];
      }
    }
  } else {
    paths.push(jsonPathMeta);
  }

  return paths;
}
