export function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * Used to detect browser support for adding an event listener with options
 * Credit: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
export function passiveEventsSupported() {
  var supported = false;

  try {
    var options = {
      get passive() {
        return (supported = true);
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    supported = false;
  }

  return supported;
}
