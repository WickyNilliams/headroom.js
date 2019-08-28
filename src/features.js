export default {
  browser: function() {
    return typeof window !== "undefined";
  },
  bind: function() {
    return !!function() {}.bind;
  },
  classList: function() {
    return "classList" in document.documentElement;
  },
  rAF: function() {
    return !!window.requestAnimationFrame;
  },
  /**
   * Used to detect browser support for adding an event listener with options
   * Credit: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   */
  passiveSupported: function() {
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
};
