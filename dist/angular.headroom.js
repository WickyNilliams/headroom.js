/*!
 * headroom.js v0.3.11 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function(angular) {

  ///////////////
  // Directive //
  ///////////////

  angular.module('headroom', []).directive('headroom', function() {
    return {
      restrict: 'EA',
      scope: {
        tolerance: '=',
        offset: '=',
        classes: '='
      },
      link: function(scope, element) {
        var options = {};
        angular.forEach(Headroom.options, function(value, key) {
          options[key] = scope[key] || Headroom.options[key];
        });
        var headroom = new Headroom(element[0], options).init();
        scope.$on('destroy', function() {
          headroom.destroy();
        });
      }
    };
  });

}(window.angular));