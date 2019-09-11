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
      // eslint-disable-next-line getter-return
      get passive() {
        supported = true;
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    supported = false;
  }

  return supported;
}

export function isSupported() {
  return !!(
    isBrowser() &&
    function() {}.bind &&
    "classList" in document.documentElement &&
    Object.assign &&
    Object.keys &&
    requestAnimationFrame
  );
}
