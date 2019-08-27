/**
 * Check if object is part of the DOM
 * @constructor
 * @param {Object} obj element to check
 */
function isDOMElement(obj) {
  return (
    obj && typeof window !== "undefined" && (obj === window || obj.nodeType)
  );
}

/**
 * Helper function for extending objects
 */
export function extend(object /*, objectN ... */) {
  if (arguments.length <= 0) {
    throw new Error("Missing arguments in extend function");
  }

  var result = object || {},
    key,
    i;

  for (i = 1; i < arguments.length; i++) {
    var replacement = arguments[i] || {};

    for (key in replacement) {
      // Recurse into object except if the object is a DOM element
      if (typeof result[key] === "object" && !isDOMElement(result[key])) {
        result[key] = extend(result[key], replacement[key]);
      } else {
        result[key] = result[key] || replacement[key];
      }
    }
  }

  return result;
}
