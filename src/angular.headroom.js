(function(angular) {

  if(!angular) {
    return;
  }

  ///////////////
  // Directive //
  ///////////////

  angular.module('headroom', []).directive('headroom', function($timeout) {
    return {
      restrict: 'EA',
      scope: {
        tolerance: '=',
        offset: '=',
        classes: '=',
        target: '@',
        onPin: '&',
        onUnpin: '&'
      },
      link: function(scope, element) {
        $timeout(function () {
          var options = {};
          angular.forEach(Headroom.options, function(value, key) {
            options[key] = scope[key] || Headroom.options[key];
          });
          var headroom = new Headroom(element[0], options);
          headroom.init();
          scope.$on('destroy', function() {
            headroom.destroy();
          });
        }, 0);
      }
    };
  });

}(window.angular));
