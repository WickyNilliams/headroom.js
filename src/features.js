/* exported features */

// window and document might be missing in server-side rendering environments
var window_ = typeof window === "undefined" ? undefined : window;
var document_ = typeof document === "undefined" ? undefined : document;

var features = {
  window: window_,
  document: document_,
  bind : !!function() {}.bind,
  classList : document_ && "classList" in document.documentElement,
  rAF : window_ ? (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) : undefined
};

export default features;
