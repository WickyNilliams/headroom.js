/* exported features */

// window and document might be missing in server-side rendering environments
var window = typeof window === 'undefined' ? undefined : window;
var document = typeof document === 'undefined' ? undefined : document;

var features = {
  window: window,
  document: document,
  bind : !!(function(){}.bind),
  classList : document && 'classList' in document.documentElement,
  rAF : window ? (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) : undefined
};
