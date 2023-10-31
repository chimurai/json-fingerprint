// light version of https://www.npmjs.com/package/kind-of
// only interested in primitives in JSON
export function getType(obj) {
  const primitiveTypes = [
    // JSON primitive types: https://www.json.org/json-en.html
    "string",
    "number",
    "boolean",
    // // https://developer.mozilla.org/en-US/docs/Glossary/Primitive
    // "undefined",
    // "bigint",
    // "symbol",
  ];

  if (obj === null) {
    return "null";
  } else if (primitiveTypes.includes(typeof obj)) {
    return typeof obj;
  } else if (Array.isArray(obj)) {
    return "array";
  } else {
    return "object"; // TODO: determine POJO
  }
}
