/* exported features */

var features = {
  bind : !!(function(){}.bind),
  classList : 'classList' in document.documentElement,
  rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
};