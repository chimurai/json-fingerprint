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
  } else if (isPlainObject(obj)) {
    return "object";
  } else {
    throw new Error(`Unsupported JSON value: ${typeof obj}`)
  }
}


function isPlainObject(value) {
  // Check for truthy value and object type
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check if constructor is Object
  return Object.prototype.constructor === value.constructor;
}
