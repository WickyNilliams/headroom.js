(function(angular) {

  if(!angular) {
    return;
  }

  ///////////////
  // Directive //
  ///////////////

  angular.module('headroom', []).directive('headroom', function() {
    return {
      restrict: 'EA',
      scope: {
        tolerance: '=',
        offset: '=',
        classes: '=',
        scroller: '@'
      },
      link: function(scope, element) {
        var options = {};
        angular.forEach(Headroom.options, function(value, key) {
          options[key] = scope[key] || Headroom.options[key];
        });
        if (options.scroller) {
          options.scroller = angular.element(options.scroller)[0];
        }
        var headroom = new Headroom(element[0], options);
        headroom.init();
        scope.$on('destroy', function() {
          headroom.destroy();
        });
      }
    };
  });

}(window.angular));
