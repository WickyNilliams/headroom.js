// window and document might be missing in server-side rendering environments
var window_ = typeof window === "undefined" ? undefined : window;
var document_ = typeof document === "undefined" ? undefined : document;

/**
 * Used to detect browser support for adding an event listener with options
 * Credit: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
function passiveSupported() {
  var isSupported = false;
  try {
    var options = {
      get passive() {
        return (isSupported = true);
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    isSupported = false;
  }

  return isSupported;
}

export default {
  window: window_,
  document: document_,
  bind: !!function() {}.bind,
  classList: document_ && "classList" in document.documentElement,
  rAF: window_ ? window.requestAnimationFrame : undefined,
  passiveSupported: passiveSupported
};
