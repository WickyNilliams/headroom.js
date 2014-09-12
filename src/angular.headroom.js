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
      scope: false,
      link: function(scope, element, attrs) {
        console.log(attrs);
        var options = {};
        angular.forEach(Headroom.options, function(value, key) {
          options[key] = attrs[key] || Headroom.options[key];
        });
        if (options.scroller) {
          options.scroller = angular.element(options.scroller)[0];
        }
        if (attrs.onPin) {
          options.onPin = function(){
            scope.$apply(attrs.onPin);
          };
        }
        if (attrs.onUnpin) {
          options.onUnpin = function(){
            scope.$apply(attrs.onUnpin);
          };
        }
        if (attrs.onTop) {
          options.onTop = function(){
            scope.$apply(attrs.onPin);
          };
        }
        if (attrs.onNotTop) {
          options.onNotTop = function(){
            scope.$apply(attrs.onUnpin);
          };
        }
        console.log(options);
        var headroom = new Headroom(element[0], options);
        headroom.init();
        scope.$on('destroy', function() {
          headroom.destroy();
        });
      }
    };
  });

}(window.angular));
