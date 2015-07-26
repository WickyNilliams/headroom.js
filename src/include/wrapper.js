(function(root, factory) {
  'use strict';

  if (typeof(define) === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof exports === 'object') {
    module.exports = factory;
  }
  else {
    root.Headroom = factory;
  }
}(this, function() {
  'use strict';

  //= ../features.js
  //= ../Debouncer.js
  //= ../Headroom.js

  return Headroom;
}));
